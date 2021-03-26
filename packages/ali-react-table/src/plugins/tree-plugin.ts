import { TreePluginValue } from '../base-table/interfaces'
import { useEffect, useRef, useState } from 'react'
import _ from 'lodash'
import { SortItem } from '../interfaces'
// import { ArtColumn } from '../interfaces'

interface ColExpandedListType {
  path: string[]
  value: string
}

export function useTreePlugin({
  leftTreeConfig,
  topTreeConfig,
  makeTopChildren,
  makeLeftChildren,
  targetChildren,
  expandKeys,
  getValues,
}: TreePluginValue) {
  const [targets, setTargets] = useState(targetChildren.map((i: any) => i.key))
  const [leftTree, setLeftTree] = useState(leftTreeConfig)
  const [topTree, setTopTree] = useState(topTreeConfig)
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
  const [isOpenRow, setIsOpenRow] = useState(false)
  // 是否点击了列展开
  const [isOpenCol, setIsOpenCol] = useState(false)
  // 判断找路径时是否找到目标key，找到了就不要再递归了
  const findFlag = useRef(false)
  // 存储values的对象
  const values = useRef({})
  // 存储请求路径的数组，方便一次请求后端
  let requestPathArr: string[][] = []

  /**
   * 找树中指定key的路径
   * @param item  待遍历数组结构
   * @param key  待查找目标节点的key
   */
  function getPath(item: any, key: string, path: string[]): void {
    path.push(item.key)
    if (item.key === key) {
      //找到节点后设置标识
      findFlag.current = true
      return
    }
    if (item.children && item.children.length > 0) {
      for (let i = 0; i < item.children.length; i++) {
        getPath(item.children[i], key, path)
        if (findFlag.current) {
          //如果有标识则不进行多余操作，直接返回
          return
        }
      }
      //子节点遍历后没有找到便弹出其父节点
      path.pop()
    } else if (!item.children || item.children.length === 0) {
      //遍历到最下层后弹出子节点
      path.pop()
    }
  }

  function findRequestPath(tree: any[], key: string) {
    const tempPath: any[] = []
    tree.forEach((item: any) => {
      getPath(item, key, tempPath)
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
      findFlag.current = false
      const requestPath = leftPath.concat(topPath)
      // console.log(requestPath)
      // todo: ⚠️这里要做values的拼接!!! 利用Promise.all请求所有数据之后渲染
      if (requestPath.length) {
        setIsLoading(true)
        // const valuesClone = JSON.parse(JSON.stringify(values))
        // 如果有key对应那么就不需要再请求
        // if (_.has(valuesClone, requestPath)) {
        //   console.log(valuesClone)
        //   setIsLoading(false)
        //   return
        // }
        requestPathArr.push(requestPath)
        // console.log(rowIndex, totalLength - 1, colIndex, lastRequestKeys.length - 1)
        // 只在最后一个对象合并后再重渲染
        if (rowIndex === totalLength - 1 && colIndex === lastRequestKeys.length - 1) {
          const result: any = await getValues(requestPathArr, targets)
          if (result && JSON.stringify(result) !== '{}') {
            Object.keys(result).forEach((key: string) => {
              _.set(values.current, JSON.parse(key), result[key])
            })
            // const combineValues = Object.assign(values, valuesClone)
            console.log(values.current)
          }
          // 确保combineValues为最新的
          setTimeout(() => {
            // setValues(JSON.parse(JSON.stringify(combineValues)))
            setIsLoading(false)
          }, 0)
        }
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
      findFlag.current = false
      if (isOpenRow) {
        selectLastRequestKeys(
          colExpandedList.map((i: ColExpandedListType) => i.value),
          leftPath,
          rowIndex,
          rowLastRequestKeys.length,
        )
      } else {
        selectLastRequestKeys(lastRequestKeys, leftPath, rowIndex, rowLastRequestKeys.length)
      }
    })
  }

  // 懒加载数据，根据展开的行配置和列配置
  useEffect(() => {
    if (isOpenCol) {
      selectRowLastRequestKeys(rowExpandedList.map((i: ColExpandedListType) => i.value))
    } else {
      selectRowLastRequestKeys(rowLastRequestKeys)
    }
  }, [lastRequestKeys, rowLastRequestKeys, colExpandedList, rowExpandedList, isOpenRow, isOpenCol])

  // 初始化列的展开配置
  useEffect(() => {
    const len = expandKeys.colKeys.length

    const topTreeClone = JSON.parse(JSON.stringify(topTree))
    lastRequestKeys.length = 0
    topTreeClone.forEach((item: any) => {
      item.path = [item.key]
      item.expanded = false
      item.children.forEach((child: any) => {
        child.path = [...item.path, child.key]
      })
      lastRequestKeys.push(item.key)
    })

    setTopTree([...topTreeClone])
    setLastRequestKeys([...lastRequestKeys])
    setColExpandedList(lastRequestKeys.map((key: string) => ({ path: ['root'], value: key })))

    if (len > 0) {
      expandKeys.colKeys.forEach((key: string) => {
        setTimeout(() => {
          onChangeOpenColumns(key, false, topTreeClone)
        }, 0)
      })
    }
  }, [])

  // 初始化行的展开配置
  useEffect(() => {
    const len = expandKeys.rowKeys.length

    rowLastRequestKeys.length = 0
    leftTree.forEach((item: any) => {
      item.path = [item.key]
      rowLastRequestKeys.push(item.key)
    })

    setLeftTree([...leftTree])
    setRowLastRequestKeys([...rowLastRequestKeys])
    setRowExpandedList(rowLastRequestKeys.map((key: string) => ({ path: ['root'], value: key })))

    if (len > 0) {
      setTimeout(() => {
        onChangeOpenKeys(expandKeys.rowKeys, expandKeys.rowKeys[len - 1], 'expand')
      }, 0)
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
    // console.log(leftNode, topNode)
    if (!leftNode.path || !topNode.path) return ''
    const leftPath = leftNode.path
    const topPath = topNode.path
    // console.log(leftPath.concat(topPath))
    return _.get(values.current, leftPath.concat(topPath), '')
  }

  // 列指标排序
  function onSortColumns(key: string, sortable: boolean, sortOrder: SortItem) {
    console.log(sortOrder, values.current)
  }

  // column的下钻
  async function onChangeOpenColumns(key: string, expanded: boolean, topTreeClone = topTree) {
    async function dfs(topTree: any) {
      for (const i of topTree) {
        if (i.key === key) {
          if (i.expanded) {
            // const childrenLen = i.children.length
            i.children = JSON.parse(JSON.stringify(targetChildren))
            i.children.forEach((child: any) => {
              child.path = [...i.path, child.key]
            })
            colExpandedList = colExpandedList.filter((item: ColExpandedListType) => {
              const pathLen = item.path.length - 1
              if (item.path[pathLen] === i.key) parentPath = item.path.slice(0, pathLen)
              return !item.path.includes(i.key)
            })
            // parentPath = colExpandedList[0].key
            lastRequestKeys.push(i.key)
          } else {
            colExpandedList = colExpandedList.filter((item: ColExpandedListType) => {
              if (item.value === i.key) parentPath = item.path
              else openKey = i.key
              return item.value !== i.key
            })
            children = await makeTopChildren(key)
            children.unshift({
              key: i.key,
              value: i.totalField ?? '总计',
              children: targetChildren,
              isLeaf: true,
            })
            i.children = JSON.parse(JSON.stringify(children))
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
          }
          i.expanded = !i.expanded
        } else {
          await dfs(i.children)
        }
      }
    }

    let children: any[] = []
    let parentPath: string[] = ['root']
    let openKey: string
    lastRequestKeys.length = 0
    await dfs(topTreeClone)
    const colExpandedListBoth = [
      ...colExpandedList,
      ...lastRequestKeys.map((i: string) => ({ path: parentPath.concat(openKey ? openKey : []), value: i })),
    ]

    setTopTree([...topTreeClone])
    setIsOpenRow(false)
    setIsOpenCol(true)
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
            children = await makeLeftChildren(key)
            i.children = JSON.parse(JSON.stringify(children))
            i.children.forEach((child: any) => {
              const childKey = child.key
              child.path = [...i.path, childKey]
              rowLastRequestKeys.push(child.key)
            })
            rowExpandedList.forEach((item: ColExpandedListType) => {
              if (item.value === i.key) parentPath = item.path
              else openKey = i.key
            })
          } else {
            i.children.length = 0
            // todo: ⚠️行收起时行的请求的路径终点keys也要改变
            rowExpandedList = rowExpandedList.filter((item: ColExpandedListType) => {
              const pathLen = item.path.length - 1
              if (item.path[pathLen] === i.key) parentPath = item.path.slice(0, pathLen)
              return !item.path.includes(i.key)
            })
            // rowLastRequestKeys = [i.key]
          }
        } else {
          await dfs(i.children)
        }
      }
    }
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
    setLeftTree([...leftTree])
    setIsOpenRow(true)
    setIsOpenCol(false)
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
    },
  }

  // 树状——>扁平
  // function treeToFlat(topTreeConfig: any) {
  //   const flatList: any[] = []
  //   const parentKeyMap: any = {}
  //   function dfs(topTreeConfig: any, parentKey: string) {
  //     topTreeConfig.forEach((i: any) => {
  //       flatList.push({ ...i, parentKey })
  //       parentKeyMap[parentKey] = 1
  //       if (i.children.length === 0 || i.children === null) {
  //         return
  //       } else {
  //         dfs(i.children, i.key)
  //       }
  //     })
  //   }
  //   dfs(topTreeConfig, 'root')
  //   flatList.forEach((i: any) => {
  //     i.children.length = 0
  //   })
  //   // rootMap['flatList'] = flatList
  //   // rootMap['children'] = flatList.filter((item: any) => item.parentKey === 'root')
  //   return {
  //     flatList,
  //     parentKeyList: Object.keys(parentKeyMap),
  //   }
  // }
  // 扁平——>树状
  // function flatToTree(flatList: any): any[] {
  //   const temp: any = {}
  //   const res: any = {}
  //   flatList.forEach((i: any) => {
  //     temp[i.key] = i
  //   })
  //   Object.keys(temp).forEach((key: any) => {
  //     const parentKey = temp[key].parentKey
  //     if (parentKey !== 'root') {
  //       temp[parentKey].children
  //         ? temp[parentKey].children.push(temp[key])
  //         : (temp[parentKey]['children'] = [temp[key]])
  //     } else {
  //       res[key] = temp[key]
  //     }
  //   })
  //   return Object.values(res)
  // }
}
