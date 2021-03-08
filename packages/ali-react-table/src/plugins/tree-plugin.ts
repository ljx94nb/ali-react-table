import { TreePluginValue } from '../base-table/interfaces'
import { useState } from 'react'

export function useTreePlugin({
  leftTreeConfig,
  topTreeConfig,
  onChangeOpenColumns,
  onChangeOpenKeys,
}: TreePluginValue) {
  const getValue = (leftNode: any, topNode: any) => {
    // console.log(leftNode, topNode)
    return topNode.value + ' ' + leftNode.value
    // if (leftNode.data.parent) {
    //   const map: any = {
    //     forenoon: '万事开头难',
    //     afternoon: '然后中间难',
    //     evening: '最后结束难',
    //   }
    //   return map[leftNode.key]
    // }
    // const courses = ['数学', '英语', '计算机基础', '数据结构', '线性代数', '微积分', '概率论']
    // // const i = (leftNode.data.x + topNode.data.y) % courses.length
    // return courses[1]
  }
  // 受控用法：
  const [leftTree, setLeftTree] = useState(leftTreeConfig)
  const [topTree, setTopTree] = useState(topTreeConfig)
  const [openKeys, setOpenKeys] = useState([leftTree[0].key])
  const [isLoading, setIsLoading] = useState(false)

  // 添加判断叶子节点的依据用来渲染下钻符号
  function isLeafNode(node: any, nodeMeta: any) {
    return node.isLeaf === true
  }

  return {
    treePlugin: {
      leftTree,
      topTree,
      openKeys,
      onChangeOpenKeys,
      onChangeOpenColumns,
      getValue,
      isLeafNode,
      isLoading,
    },
    setLeftTree,
    setTopTree,
    setOpenKeys,
    setIsLoading,
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
