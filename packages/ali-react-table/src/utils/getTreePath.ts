/**
 * 找树中指定key的路径
 * @param item  待遍历数组结构
 * @param key  待查找目标节点的key
 */
export function getPath(item: any, key: string, path: string[], findFlag: { current: boolean }): void {
  path.push(item.key)
  if (item.key === key) {
    //找到节点后设置标识
    findFlag.current = true
    return
  }
  if (item.children && item.children.length > 0) {
    for (let i = 0; i < item.children.length; i++) {
      getPath(item.children[i], key, path, findFlag)
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
