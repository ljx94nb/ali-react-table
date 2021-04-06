import deepClone from 'lodash/cloneDeep'

/**
 * 递归数组找到需要添加children的项，并且添加进去
 * @param data 源数组
 * @param children children数组
 * @param keyPath 展开路径
 */
export const addChildren = (data: any[], children: any[], keyPath: string[]) => {
  const cloneData = deepClone(data)
  let keyIndex = 0
  dfs(cloneData, keyIndex)
  return cloneData

  function dfs(data: any[], keyIndex: number) {
    if (keyIndex > keyPath.length - 1) {
      // 不可以改变数组的地址，往里面添加
      data.length === 0 && data.push(...children)
      return
    }
    for (let i = 0; i < data.length; i++) {
      if (data[i].id === keyPath[keyIndex] && Array.isArray(data[i].children)) {
        dfs(data[i].children, keyIndex + 1)
      }
    }
  }
}
