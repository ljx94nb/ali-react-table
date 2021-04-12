/*** src/index.js ***/
// import React, { useState, useEffect } from 'react'
// import { requestData, requestDetailData } from './request'
// import * as fusion from '@alifd/next'
// import { ratio, addChildren } from './utils'
// import { BaseTable, ArtColumn, useTablePipeline, features, PaginationPlugin, usePlugins } from 'ali-react-table'

import React, { useEffect, useState } from 'react'
import { BaseTable, useTreePlugin, deepClone, TreePluginValue } from 'ali-react-table'
import { CrossTreeTable } from 'ali-react-table/pivot'
// import _ from 'lodash'
// import { format, cdnData } from '../../website/src/assets'
// import styled from 'styled-components'
// import { Dropdown, Menu } from '@alifd/next'
// import { icons } from '../../ali-react-table/src/common-views'
// import * as fusion from '@alifd/next'

// const expandKeys = {
//   rowKeys: ['forenoon'] as string[],
//   colKeys: ['上半年'] as string[],
// }

// const OperationsDiv = styled.div`
//   display: flex;
//   height: 20px;
//   align-items: center;

//   .item {
//     height: 20px;
//     cursor: pointer;
//     color: #3858cf;
//     display: flex;
//     align-items: center;

//     &.danger {
//       color: #eb4141;
//     }
//   }

//   .sep {
//     height: 10px;
//     width: 1px;
//     margin-left: 12px;
//     margin-right: 12px;
//     background: #eeeeee;
//   }
// `

function App() {
  /** CrossTreeTable示例 */
  // function handleDelete(leftTree: LeftCrossTreeNode[], path: string[]) {
  //   // console.log(path)
  //   setIsLoading(true)
  //   const leftPath = path[0]
  //     .split('|')[0]
  //     .split('_')
  //     .map((j: string) => j.split(':')[1])
  //   const leftTreeClone = deepClone(leftTree)
  //   dfs(leftTreeClone)
  //   console.log(leftTreeClone)
  //   setLeftTree(leftTreeClone)
  //   setIsLoading(false)

  //   function dfs(leftTreeClone: LeftCrossTreeNode[]) {
  //     leftTreeClone.forEach((item: LeftCrossTreeNode, index: number) => {
  //       if (JSON.stringify(item.path) === JSON.stringify(leftPath)) {
  //         leftTreeClone.splice(index, 1)
  //         return
  //       }
  //       if (item.children && item.children.length) {
  //         dfs(item.children)
  //       }
  //     })
  //   }
  // }

  // function renderOptions(leftTree: LeftCrossTreeNode[], topTree: TopCrossTreeNode[], path: string[]) {
  //   return (
  //     <OperationsDiv>
  //       <div className="item" onClick={() => {}}>
  //         编辑
  //       </div>
  //       <div className="sep" />
  //       <div
  //         className="item danger"
  //         onClick={() => {
  //           handleDelete(leftTree, path)
  //         }}
  //       >
  //         删除
  //       </div>
  //       <div className="sep" />
  //       {/* <Dropdown
  //       trigger={
  //         <div className="item">
  //           更多
  //           <icons.CaretDown style={{ color: '#A6A6A6' }} />
  //         </div>
  //       }
  //       triggerType="click"
  //     >
  //       <Menu>
  //         <Menu.Item>Option 1</Menu.Item>
  //         <Menu.Item>Option 2</Menu.Item>
  //         <Menu.Item>Option 3</Menu.Item>
  //         <Menu.Item>Option 4</Menu.Item>
  //       </Menu>
  //     </Dropdown> */}
  //     </OperationsDiv>
  //   )
  // }

  // function bfs(tree: any[]) {
  //   const stack = deepClone(tree)
  //   const target = []
  //   while (stack.length) {
  //     const node = stack.shift()
  //     node.dimension && target.push(node.dimension)
  //     if (node.children && node.children.length) {
  //       stack.push(...node.children)
  //     }
  //   }
  //   return target
  // }

  // function getDimensionList(leftTree: LeftCrossTreeNode[], topTree: TopCrossTreeNode[]) {
  //   const row = bfs(leftTree)
  //   const col = bfs(topTree)
  //   return {
  //     row,
  //     col,
  //   }
  // }

  // async function treeInit(leftTree: LeftCrossTreeNode[], topTree: TopCrossTreeNode[]) {
  //   topTree.push({
  //     key: 'operation',
  //     lock: true,
  //     width: 200,
  //     value: '操作',
  //     isLeaf: true,
  //     data: 12,
  //     renderFun: renderOptions,
  //     children: [],
  //     path: ['operation'],
  //   })
  // }

  // 维度层级必须按照数组顺序依次排列
  // const [dimensionList, setDimensionList] = useState()
  // const [targetChildren, setTargetChildren] = useState(indicators)
  // const [tree, setTree] = useState<TreePluginValue>(treeConfig)
  const treeConfig = {
    indicatorList: [
      {
        key: '目标收入',
        value: '目标收入',
        isLeaf: true,
        children: [] as any[],
        sortable: true,
      },
      {
        key: '实际收入',
        value: '实际收入',
        isLeaf: true,
        children: [],
        sortable: true,
      },
      {
        key: '目标达成率',
        value: '目标达成率',
        isLeaf: true,
        children: [],
        sortable: true,
      },
      {
        key: '收入月环比',
        value: '收入月环比',
        isLeaf: true,
        children: [],
        sortable: true,
      },
    ],
    dimensionMap: { row: ['noon', 'time'], col: ['year', 'month', 'week'] }, // 与后端对接商讨dimensionMap的值
    topDimensionTreeUrl: 'http://localhost:3002/get_top_tree',
    leftDimensionTreeUrl: 'http://localhost:3002/get_left_tree',
    valuesUrl: 'http://localhost:3002/get_values',
    onSort: (colIndex: any, sortOrder: any) => {},
  }

  const [treePluginSource, setTreePluginSource] = useState(treeConfig)
  const { treePlugin } = useTreePlugin(treePluginSource)

  return (
    <div>
      <CrossTreeTable
        // 非受控用法：
        // defaultOpenKeys={[leftTree[0].key]}
        // openKeys={openKeys}
        // onChangeOpenKeys={changeOpenKeys}
        // onChangeOpenColumns={changeOpenColumns}
        // 表格第一列的配置
        primaryColumn={{ lock: true, name: '数据维度', width: 200 }}
        defaultColumnWidth={120}
        // style={{ width: 600, maxHeight: 400, overflow: 'auto', border: '1px solid #eee' }}
        // leftTree={leftTree}
        // topTree={topTree}
        // getValue={getValue}
        // isLeafNode={isLeafNode}
        {...treePlugin}
        // isLoading={state.isLoading}
        // {...pipeline.getProps()}
      />
    </div>
  )
}

export default App
