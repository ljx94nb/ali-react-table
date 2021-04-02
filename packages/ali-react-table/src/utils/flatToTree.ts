// 扁平——>树状
export function flatToTree(flatList: any): any[] {
  const temp: any = {}
  const res: any = {}
  flatList.forEach((i: any) => {
    temp[i.key] = i
  })
  Object.keys(temp).forEach((key: any) => {
    const parentKey = temp[key].parentKey
    if (parentKey !== 'root') {
      temp[parentKey].children ? temp[parentKey].children.push(temp[key]) : (temp[parentKey]['children'] = [temp[key]])
    } else {
      res[key] = temp[key]
    }
  })
  return Object.values(res)
}
