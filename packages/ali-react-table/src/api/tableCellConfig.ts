import { IndicatorNode, LeftCrossTreeNode, TopCrossTreeNode } from '../pivot/cross-table'
import { deepClone } from '../utils'

/**
 * 生成扁平化的indicators数组
 * @param indicators indicators数组
 * @returns 扁平化的indicators数组
 */
function indicatorsToFlat(indicators: IndicatorNode[]) {
  const indicatorsFlat: IndicatorNode[] = []
  dfs(indicators)
  return indicatorsFlat

  function dfs(indicators: IndicatorNode[]) {
    indicators.forEach((i) => {
      if (i.children && i.children.length) {
        dfs(i.children)
      } else {
        indicatorsFlat.push(i)
      }
    })
  }
}

// 为topChildren添加path
export function addPathToTopChildren(topChildren: TopCrossTreeNode[], path: string[]) {
  topChildren.forEach((i) => {
    i.path = path.concat(i.key ? [i.key] : [])
    if (i.isLeaf !== undefined && i.isLeaf === false) i.expanded = false
    if (i.children && i.children.length) {
      addPathToTopChildren(i.children, i.path)
    }
  })
}

// 为leftChildren添加path
function addPathToLeftChildren(leftChildren: LeftCrossTreeNode[], path: string[]) {
  leftChildren.forEach((i) => {
    i.path = path.concat(i.key ? [i.key] : [])
    if (i.children && i.children.length) {
      addPathToLeftChildren(i.children, i.path)
    }
  })
}

export const getValues = async (
  url: string,
  requestPathList: string[],
  indicatorList: IndicatorNode[],
  sortOptionMap: any,
): Promise<any> => {
  try {
    const body = {
      requestPathList,
      indicatorList: indicatorsToFlat(indicatorList).map((i) => i.key),
      sortOptionMap,
    }
    console.log(body)
    const res = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    }).then((res) => res.json())
    // console.log(res)
    if (res.code !== 200) throw new Error('数据矩阵请求失败')
    return res.data
  } catch (err) {
    throw new Error(err)
  }
}

// 为topTree添加indicators
export function addTargetChildren(topTree: TopCrossTreeNode[], indicatorList: IndicatorNode[]) {
  topTree.forEach((i) => {
    if (i.children && i.children.length) {
      addTargetChildren(i.children, indicatorList)
    } else {
      i.children = deepClone(indicatorList)
    }
  })
}

// 为topTree更改indicators
export function updateTargetChildren(topTree: TopCrossTreeNode[], indicatorListKeys: string[]) {
  topTree.forEach((i) => {
    if (i.children && i.children.length) {
      updateTargetChildren(i.children, indicatorListKeys)
    } else {
      if (!indicatorListKeys.includes(i.key)) topTree.splice(topTree.indexOf(i), 1)
    }
  })
}

// 模拟请求树状列children的方法
export const makeTopChildren = async (
  topDimensionTreeUrl: string,
  keyPrefix: string,
  dimension: string,
  indicatorList: IndicatorNode[],
  path: string[],
  isAddTotalField: boolean = true,
): Promise<TopCrossTreeNode[]> => {
  try {
    const indicatorsFlat = indicatorsToFlat(indicatorList)
    const body = {
      keyPrefix,
      dimension,
      indicatorKeys: indicatorsFlat.map((i) => i.key),
    }
    // console.log(body)
    const res = await fetch(topDimensionTreeUrl, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    }).then((res) => res.json())
    if (res.code !== 200) throw new Error('列配置请求失败')
    const data = res.data
    addTargetChildren(data, indicatorList)
    if (isAddTotalField) {
      data.unshift({
        value: '总计',
        children: indicatorList,
        isLeaf: true,
      })
    }
    addPathToTopChildren(data, path)
    return data
  } catch (error) {
    throw new Error(error)
  }
}

// 模拟请求树状行children的方法
export const makeLeftChildren = async (
  leftDimensionTreeUrl: string,
  keyPrefix: string,
  dimension: string,
  path: string[],
): Promise<LeftCrossTreeNode[]> => {
  try {
    const body = {
      keyPrefix,
      dimension,
    }
    // console.log(body)
    const res = await fetch(leftDimensionTreeUrl, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    }).then((res) => res.json())
    if (res.code !== 200) throw new Error('行配置请求失败')
    addPathToLeftChildren(res.data, path)
    return res.data
  } catch (error) {
    throw new Error(error)
  }
}
