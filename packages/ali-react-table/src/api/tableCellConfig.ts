import { IndicatorNode, LeftCrossTreeNode, TopCrossTreeNode } from '../pivot/cross-table'
import { deepClone } from '../utils'

export const getValues = async (
  url: string,
  requestPathsList: string[],
  indicatorsList: string[],
  sortOptionsMap: any,
): Promise<any> => {
  try {
    const body = {
      requestPathsList,
      indicatorsList,
      sortOptionsMap,
    }
    // console.log(body)
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
): Promise<TopCrossTreeNode[]> => {
  try {
    const body = {
      keyPrefix,
      dimension,
      indicatorKeys: indicatorList.map((i) => i.key),
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
    return res.data
  } catch (error) {
    throw new Error(error)
  }
}
