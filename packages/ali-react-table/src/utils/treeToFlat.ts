// 树状——>扁平
export function treeToFlat(topTreeConfig: any) {
  const flatList: any[] = []
  const parentKeyMap: any = {}
  function dfs(topTreeConfig: any, parentKey: string) {
    topTreeConfig.forEach((i: any) => {
      flatList.push({ ...i, parentKey })
      parentKeyMap[parentKey] = 1
      if (i.children.length === 0 || i.children === null) {
        return
      } else {
        dfs(i.children, i.key)
      }
    })
  }
  dfs(topTreeConfig, 'root')
  flatList.forEach((i: any) => {
    i.children.length = 0
  })
  // rootMap['flatList'] = flatList
  // rootMap['children'] = flatList.filter((item: any) => item.parentKey === 'root')
  return {
    flatList,
    parentKeyList: Object.keys(parentKeyMap),
  }
}
