import { TreePluginValue } from '../base-table/interfaces'
import { useEffect, useRef, useState } from 'react'
import get from 'lodash/get'
import set from 'lodash/set'
import has from 'lodash/has'
// import deepClone from 'lodash/cloneDeep'
import { SortItem, SortOrder } from '../interfaces'
import { treeToFlat, flatToTree, getPath, deepClone, getTreeMinDepth } from '../utils'
import { LeftCrossTreeNode, TopCrossTreeNode } from '../pivot/cross-table'
// import { ArtColumn } from '../interfaces'

interface ColExpandedListType {
  path: string[]
  value: string
}

type OpenCode = 'row' | 'col' | 'none'

export function useTreePlugin({
  makeTopChildren,
  makeLeftChildren,
  targetChildren,
  expandKeys,
  getValues,
  dimensionList,
  treeInit,
}: TreePluginValue) {
  const [leftTree, setLeftTree] = useState<LeftCrossTreeNode[]>([])
  const [topTree, setTopTree] = useState<TopCrossTreeNode[]>([])
  const [openKeys, setOpenKeys] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  // 列最后的key
  const [lastRequestKeys, setLastRequestKeys] = useState(['root'])
  // 行最后的key
  let [rowLastRequestKeys, setRowLastRequestKeys] = useState(['root'])
  // 列展开的项
  let [colExpandedList, setColExpandedList] = useState<ColExpandedListType[]>([])
  // 行展开的项
  let [rowExpandedList, setRowExpandedList] = useState<ColExpandedListType[]>([])
  // 是否点击了行展开
  const [openCode, setOpenCode] = useState<OpenCode>('none')
  // 是否点击了列展开
  // const [isOpenCol, setIsOpenCol] = useState(false)
  // 判断找路径时是否找到目标key，找到了就不要再递归了
  const findFlag = useRef(false)
  // 存储values的对象
  const values = useRef({})
  const [valuesState, setValuesState] = useState(values.current)
  // 存储leftTree的buffer
  // const leftTreeBuffer = useRef([])
  // 保存排序的状态
  const [sortOrderTarget, setSortOrderTarget] = useState<SortItem>({ code: '', order: 'none' })
  // 保存属于排序状态的colIndex
  const sortColIndex = useRef<number>(-1)
  // 存储请求路径的数组，方便一次请求后端
  const requestPathSet = useRef<Set<string>>(new Set())
  const requestPathArr = useRef<string[]>([])
  // 定时器
  let clock: NodeJS.Timeout = null

  function findRequestPath(tree: any[], key: string) {
    const tempPath: any[] = []
    tree.forEach((item: any) => {
      getPath(item, key, tempPath, findFlag)
    })
    return tempPath
  }

  /**
   * 处理列最后的key找到列的路径
   */
  async function selectLastRequestKeys(
    lastRequestKeys: string[],
    leftPath: string[],
    rowIndex: number,
    totalLength: number,
  ) {
    for (let colIndex = 0; colIndex < lastRequestKeys.length; colIndex++) {
      const topPath = findRequestPath([{ key: 'root', children: topTree }], lastRequestKeys[colIndex])
      topPath.splice(topPath.indexOf('root'), 1)
      for (let i = 0, len = topPath.length; i < len; i++) {
        topPath[i] = `${dimensionList.col[i]}:${topPath[i]}`
      }
      findFlag.current = false

      if (leftPath.length && topPath.length) {
        const requestPath = `${leftPath.join('_')}|${topPath.join('_')}`
        // console.log(values.current)
        if (!has(values.current, pathKeyToPathArr(requestPath)) || sortColIndex.current !== -1)
          requestPathSet.current.add(requestPath)

        if (!clock)
          clock = setTimeout(() => {
            requestPathArr.current = Array.from(requestPathSet.current)
            requestData(requestPathArr.current)
            requestPathSet.current.clear()
          }, 0)
      }
    }
  }

  /**
   * 处理行最后的路径，找到行的路径
   */
  function selectRowLastRequestKeys(rowLastRequestKeys: string[]) {
    rowLastRequestKeys.forEach((rowKey: string, rowIndex: number) => {
      const leftPath = findRequestPath([{ key: 'root', children: leftTree }], rowKey)
      leftPath.splice(leftPath.indexOf('root'), 1)
      for (let i = 0, len = leftPath.length; i < len; i++) {
        leftPath[i] = `${dimensionList.row[i]}:${leftPath[i]}`
      }
      findFlag.current = false
      if (openCode === 'row') {
        selectLastRequestKeys(
          colExpandedList.map((i: ColExpandedListType) => i.value),
          leftPath,
          rowIndex,
          rowLastRequestKeys.length,
        )
      } else if (openCode === 'col') {
        selectLastRequestKeys(lastRequestKeys, leftPath, rowIndex, rowLastRequestKeys.length)
      }
    })
  }

  /**
   * 请求数据矩阵
   */
  async function requestData(requestPathArr: string[]) {
    try {
      if (requestPathArr.length) {
        console.log(requestPathArr)
        setIsLoading(true)
        const sortOptions = getSortOptions(sortOrderTarget)
        const { result, sortStartIndex, sortEndIndex } = await getValues(
          requestPathArr,
          targetChildren.map((i) => i.key),
          sortOptions,
        )
        // console.log(result, sortStartIndex, sortEndIndex)
        if (result && JSON.stringify(result) !== '{}') {
          result.forEach((item: any) => {
            item && item.path && item.data && set(values.current, item.path, item.data)
          })
          // 排序逻辑：先利用扁平化的结构排序leftTree，最后还原成Tree。⚠️扁平化必须是深度优先遍历，否则会造成顺序紊乱
          // 排序真是煞费苦心，555～
          if (sortStartIndex !== -1) {
            const sortPart = result.slice(sortStartIndex, sortEndIndex + 1)
            let pathKeys = sortPart.map((item: any) => item.pathKey.split('|')[0].split('_'))
            pathKeys = pathKeys.map((item: string[]) => item.map((key: string) => key.split(':')[1]))
            const leftTreeFlatClone = treeToFlat(deepClone(leftTree)).flatList
            const sortLeftTreeFlatClone: any = []
            for (let i = 0; i < pathKeys.length; i++) {
              for (let j = 0; j < leftTreeFlatClone.length; j++) {
                if (JSON.stringify(pathKeys[i]) === JSON.stringify(leftTreeFlatClone[j].path))
                  sortLeftTreeFlatClone.push(leftTreeFlatClone[j])
              }
            }
            const sortLeftTreeClone = flatToTree(sortLeftTreeFlatClone)
            setLeftTree(sortLeftTreeClone)
            // console.log(sortLeftTreeClone)
          }
          // addDataDfs(leftTree, [], sortOrderTarget.current)
          // sortDfs(leftTree, sortOrderTarget.current)
        }
      }
    } catch (error) {
    } finally {
      setValuesState({ ...values.current })
      setIsLoading(false)
    }
  }

  /**
   * 初始化行列的配置
   */
  async function handleAsyncEffect() {
    setIsLoading(true)

    // 初始化列配置
    lastRequestKeys.length = 0
    const topTreeConfig = await makeTopChildren(
      'root',
      dimensionList.col[0],
      targetChildren.map((i) => i.key),
    )
    topTreeConfig.forEach((item: any) => {
      item.path = [item.key]
      item.expanded = false
      item.children.forEach((child: any) => {
        child.path = [...item.path, child.key]
      })
      item.render === undefined && lastRequestKeys.push(item.key)
    })

    // 初始化行配置
    rowLastRequestKeys.length = 0
    const leftTreeConfig = await makeLeftChildren('root', dimensionList.row[0])
    leftTreeConfig.forEach((item: any) => {
      item.path = [item.key]
      rowLastRequestKeys.push(item.key)
    })

    // 外部个性化定制的函数treeInit
    treeInit && (await treeInit(leftTreeConfig, topTreeConfig))

    setTopTree([...topTreeConfig])
    setLastRequestKeys([...lastRequestKeys])
    setColExpandedList(lastRequestKeys.map((key: string) => ({ path: ['root'], value: key })))

    setLeftTree([...leftTreeConfig])
    setRowLastRequestKeys([...rowLastRequestKeys])
    setRowExpandedList(rowLastRequestKeys.map((key: string) => ({ path: ['root'], value: key })))
    setOpenCode('row')

    setIsLoading(false)
  }

  // 懒加载数据，根据展开的行配置和列配置
  useEffect(() => {
    // console.log(isOpenRow, isOpenCol)
    if (openCode === 'col') {
      selectRowLastRequestKeys(rowExpandedList.map((i: ColExpandedListType) => i.value))
    } else if (openCode === 'row') {
      selectRowLastRequestKeys(rowLastRequestKeys)
    }
  }, [lastRequestKeys, rowLastRequestKeys, colExpandedList, rowExpandedList, openCode, sortOrderTarget])

  // 初始化行列的展开配置
  useEffect(() => {
    // const len = expandKeys.colKeys.length
    handleAsyncEffect()
    // if (len > 0) {
    //   setTimeout(() => {
    //     expandKeys.colKeys.forEach((key: string) => {
    //       onChangeOpenColumns(key, false, topTreeClone)
    //     })
    //   }, 0)
    // }
    // 组件卸载时清除定时器
    return () => {
      clearTimeout(clock)
    }
  }, [])

  // 添加判断叶子节点的依据用来渲染下钻符号
  function isLeafNode(node: any, nodeMeta: any) {
    return node.isLeaf === true
  }

  // 根据矩阵获取表格cell数据
  const getValue = (
    leftNode: any,
    topNode: any,
    leftDepth: number,
    topDepth: number,
    rowIndex: number,
    colIndex: number,
  ) => {
    if (!leftNode.path || !topNode.path) throw new Error('行列配置缺少path字段')
    const leftPath = leftNode.path
    const topPath = topNode.path
    if (topNode.render && typeof topNode.render === 'function') {
      const temp = leftPath.map((key: string, index: number) => `${dimensionList.row[index]}:${key}`)
      const keyArr = colExpandedList.map((item: ColExpandedListType) => item.value)
      const pathArr: string[] = []

      keyArr.forEach((key: string) => {
        let path = findRequestPath([{ key: 'root', children: topTree }], key)
        path.shift()
        path = path.map((item: string, index: number) => `${dimensionList.col[index]}:${item}`)
        pathArr.push(path.join('_'))
        findFlag.current = false
      })

      return topNode.render(
        leftTree,
        topTree,
        pathArr.map((key: string) => `${temp.join('_')}|${key}`),
      )
    }
    if (topNode.data !== undefined) return topNode.data
    return get(valuesState, leftPath.concat(topPath), '')
  }

  /**
   * 前端排序的逻辑函数：处理leftTree，为每行绑定数据排序
   */
  // function addDataDfs(leftTreeClone: any[], leftPath: string[], sortOrder: SortItem) {
  //   if (sortOrder.code === '') return
  //   leftTreeClone.forEach((item: any) => {
  //     leftPath.push(item.key)
  //     // console.log(leftPath)
  //     item.data = _.get(values.current, [...leftPath, ...JSON.parse(sortOrder.code)])
  //     if (item.children.length) addDataDfs(item.children, leftPath, sortOrder)
  //     leftPath.pop()
  //   })
  // }

  // function sortDfs(leftTreeClone: any[], sortOrder: SortItem) {
  //   leftTreeClone.sort((a, b) => {
  //     if (sortOrder.order === 'asc') return a.data - b.data
  //     else if (sortOrder.order === 'desc') return b.data - a.data
  //     else return
  //   })
  //   leftTreeClone.forEach((item: any) => {
  //     if (item.children) {
  //       sortDfs(item.children, sortOrder)
  //     }
  //   })
  // }

  /**
   * 处理pathKeys转换成数组形式的pathArr
   * @param str pathKey
   * @returns pathArr
   */
  function pathKeyToPathArr(str: string) {
    return str
      .split('|')
      .map((i: string) => i.split('_').map((j: string) => j.split(':')[1]))
      .reduce((a, b) => a.concat(b))
  }

  /**
   * 获取leftTree的所有keys的路径
   * @returns pathArr = ["noon:forenoon", "noon:forenoon_time:forenoon-9", "noon:forenoon_time:forenoon-10", "noon:forenoon_time:forenoon-11", "noon:afternoon", "noon:evening"]
   *  */
  function getLeftTreeKeys(leftTree: any[], dimensionList: string[], deepth = Infinity) {
    function dfs(leftTree: any[], deep: number) {
      deep += 1
      leftTree.forEach((item: any) => {
        keysArr.push(item.key)
        if (item.children.length && deep < deepth) {
          dfs(item.children, deep)
        }
      })
    }
    const keysArr: string[] = []
    const pathArr: string[] = []
    dfs(leftTree, 0)
    keysArr.forEach((key: string) => {
      let tempArr: string[] = []
      leftTree.forEach((item: any) => {
        !findFlag.current && getPath(item, key, tempArr, findFlag)
      })
      findFlag.current = false
      tempArr = tempArr.map((item: string, index: number) => `${dimensionList[index]}:${item}`)
      pathArr.push(tempArr.join('_'))
    })
    return pathArr
  }

  // 获取排序请求的options：rowSortKeys、targetKey、sortOrder
  function getSortOptions(sortOrder: SortItem) {
    if (sortOrder.code !== '' && sortOrder.order !== 'none') {
      let rowSortKeys = getLeftTreeKeys(leftTree, dimensionList.row)
      let sortCodePath = JSON.parse(sortOrder.code)
      const targetKey = sortCodePath.pop()
      sortCodePath = sortCodePath.map((item: string, index: number) => `${dimensionList.col[index]}:${item}`)
      rowSortKeys = rowSortKeys.map((key: string) => `${key}|${sortCodePath.join('_')}`)
      // const leftTreeSortConfig = await getSortCol(rowSortKeys, targetKey, sortOrder.order)
      // setLeftTree(JSON.parse(JSON.stringify(leftTreeSortConfig)))
      // setIsLoading(false)
      return {
        rowSortKeys,
        targetKey,
        sortOrder: sortOrder.order,
      }
    }
  }

  // 列指标排序
  function onSortColumns(colIndex: number, sortOrder: SortItem) {
    // setIsLoading(true)
    // 前端排序的逻辑
    // const leftTreeClone = JSON.parse(JSON.stringify(leftTree))
    // if (sortOrder.code !== sortOrderTarget.current.code) {
    //   addDataDfs(leftTreeClone, [], sortOrder)
    //   leftTreeBuffer.current = JSON.parse(JSON.stringify(leftTreeClone))
    // }
    // sortOrderTarget.current = { ...sortOrder }
    // sortDfs(leftTreeClone, sortOrder)
    // console.log(sortOrder, values.current, leftTreeClone)
    // setLeftTree(
    //   sortOrder.order === 'none' && leftTreeBuffer.current.length ? [...leftTreeBuffer.current] : leftTreeClone,
    // )
    // 后端排序的逻辑：请求后端排序接口
    sortColIndex.current = sortOrder.order === 'none' ? -1 : colIndex
    // requestPathArr.current.length = 0
    setSortOrderTarget({ ...sortOrder })
    // getSortOptions(sortOrder)
  }

  // column的下钻
  async function onChangeOpenColumns(key: string, expanded: boolean, topTreeClone = deepClone(topTree)) {
    async function dfs(topTree: any) {
      for (const i of topTree) {
        if (i.key === key) {
          if (i.expanded) {
            // const childrenLen = i.children.length
            i.children = deepClone(targetChildren)
            i.children.forEach((child: any) => {
              child.path = [...i.path, child.key]
            })
            colExpandedList = colExpandedList.filter((item: ColExpandedListType) => {
              const pathLen = item.path.length - 1
              if (item.path[pathLen] === i.key) parentPath = item.path.slice(0, pathLen)
              return !item.path.includes(i.key)
            })
            // parentPath = colExpandedList[0].key
            openCol = 'none'
            lastRequestKeys.push(i.key)
            // console.log(colExpandedList, lastRequestKeys)
          } else {
            colExpandedList = colExpandedList.filter((item: ColExpandedListType) => {
              if (item.value === i.key) parentPath = item.path
              else openKey = i.key
              return item.value !== i.key
            })
            children = await makeTopChildren(
              key,
              dimensionList.col[dimensionList.col.indexOf(i.dimension) + 1],
              targetChildren.map((i) => i.key),
            )
            children.unshift({
              key: i.key,
              value: i.totalField ?? '总计',
              children: targetChildren,
              isLeaf: true,
            })
            i.children = deepClone(children)
            i.children.forEach((child: any) => {
              child.expanded = false
              const childKey = child.key
              child.path = [...i.path]
              if (childKey !== child.path[child.path.length - 1]) {
                child.path.push(childKey)
              }
              lastRequestKeys.push(childKey)
              child.children.forEach((item: any) => {
                item.path = [...child.path, item.key]
              })
            })
            openCol = 'col'
          }
          i.expanded = !i.expanded
        } else {
          await dfs(i.children)
        }
      }
    }

    let openCol = openCode
    let children: any[] = []
    let parentPath: string[] = ['root']
    let openKey: string
    lastRequestKeys.length = 0
    await dfs(topTreeClone)
    const colExpandedListBoth = [
      ...colExpandedList,
      ...lastRequestKeys.map((i: string) => ({ path: parentPath.concat(openKey ? openKey : []), value: i })),
    ]

    // requestPathArr.current.length = 0
    setTopTree([...topTreeClone])
    setOpenCode(openCol)
    // console.log(topTreeClone)
    setColExpandedList(colExpandedListBoth)
    setLastRequestKeys([...lastRequestKeys])
  }

  // row的下钻
  async function onChangeOpenKeys(nextKeys: string[], key: string, action: string) {
    async function dfs(leftTree: any) {
      for (const i of leftTree) {
        if (i.key === key) {
          if (action === 'expand') {
            children = await makeLeftChildren(key, dimensionList.row[dimensionList.row.indexOf(i.dimension) + 1])
            i.children = deepClone(children)
            i.children.forEach((child: any) => {
              const childKey = child.key
              child.path = [...i.path, childKey]
              rowLastRequestKeys.push(child.key)
            })
            rowExpandedList.forEach((item: ColExpandedListType) => {
              if (item.value === i.key) parentPath = item.path
              else openKey = i.key
            })
            openRow = 'row'
          } else {
            i.children.length = 0
            // todo: ⚠️行收起时行的请求的路径终点keys也要改变
            rowExpandedList = rowExpandedList.filter((item: ColExpandedListType) => {
              const pathLen = item.path.length - 1
              if (item.path[pathLen] === i.key) parentPath = item.path.slice(0, pathLen)
              return !item.path.includes(i.key)
            })
            // rowLastRequestKeys = [i.key]
            openRow = 'none'
          }
        } else {
          await dfs(i.children)
        }
      }
    }

    let openRow = openCode
    let children: any[] = []
    let parentPath: string[] = ['root']
    let openKey: string
    rowLastRequestKeys.length = 0
    setOpenKeys(nextKeys)
    await dfs(leftTree)
    const rowExpandedListBoth = [
      ...rowExpandedList,
      ...rowLastRequestKeys.map((i: string) => ({ path: parentPath.concat(openKey ? openKey : []), value: i })),
    ]

    // requestPathArr.current.length = 0
    // 列展开暂时不需要记录leftTree的buffer
    // leftTreeBuffer.current = JSON.parse(JSON.stringify(leftTree))
    setLeftTree([...leftTree])
    setOpenCode(openRow)
    // console.log(rowExpandedListBoth)
    setRowExpandedList(rowExpandedListBoth)
    setRowLastRequestKeys([...rowLastRequestKeys])
  }

  return {
    treePlugin: {
      leftTree,
      topTree,
      openKeys,
      onChangeOpenKeys,
      onChangeOpenColumns,
      onSortColumns,
      getValue,
      isLeafNode,
      isLoading,
      sortColIndex: sortColIndex.current,
    },
    setIsLoading,
    setLeftTree,
    setTopTree,
  }
}
