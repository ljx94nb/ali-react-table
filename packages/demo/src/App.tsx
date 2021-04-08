/*** src/index.js ***/
// import React, { useState, useEffect } from 'react'
// import { requestData, requestDetailData } from './request'
// import * as fusion from '@alifd/next'
// import { ratio, addChildren } from './utils'
// import { BaseTable, ArtColumn, useTablePipeline, features, PaginationPlugin, usePlugins } from 'ali-react-table'

import React, { useEffect, useState } from 'react'
import { BaseTable, useTreePlugin, useTablePipeline, features, ArtColumn, deepClone } from 'ali-react-table'
import { CrossTreeTable, TopCrossTreeNode, LeftCrossTreeNode } from 'ali-react-table/pivot'
import _ from 'lodash'
import { getValues } from './mock/tableCellConfig'
import { format, cdnData } from '../../website/src/assets'
import styled from 'styled-components'
import { Dropdown, Menu } from '@alifd/next'
import { icons } from '../../ali-react-table/src/common-views'
import * as fusion from '@alifd/next'

const leftTreeConfig: LeftCrossTreeNode[] = [
  {
    key: 'forenoon',
    value: '上午',
    isLeaf: false,
    children: [] as any[],
  },
  {
    key: 'afternoon',
    value: '下午',
    isLeaf: false,
    children: [] as any[],
  },
  {
    key: 'evening',
    value: '晚上',
    isLeaf: false,
    children: [] as any[],
  },
]

const targetChildren = [
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
    children: [] as any[],
    sortable: true,
  },
  {
    key: '目标达成率',
    value: '目标达成率',
    isLeaf: true,
    children: [] as any[],
    sortable: true,
  },
  {
    key: '收入月环比',
    value: '收入月环比',
    isLeaf: true,
    children: [] as any[],
    sortable: true,
  },
]

const topTreeConfig: TopCrossTreeNode[] = [
  {
    key: '上半年',
    value: '上半年',
    isLeaf: false,
    children: targetChildren,
    totalField: '所有月份',
  },
  {
    key: '下半年',
    value: '下半年',
    isLeaf: false,
    children: targetChildren,
    totalField: '所有月份',
  },
]

// 模拟请求树状列children的方法
const makeTopChildren = async (keyPrefix: string): Promise<TopCrossTreeNode[]> => {
  if (keyPrefix === '上半年') {
    return [
      {
        key: '2020-01',
        value: '2020-01',
        children: targetChildren,
        isLeaf: false,
        totalField: '所有周',
      },
      {
        key: '2020-02',
        value: '2020-02',
        children: targetChildren,
        isLeaf: false,
        totalField: '所有周',
      },
      {
        key: '2020-03',
        value: '2020-03',
        children: targetChildren,
        isLeaf: false,
        totalField: '所有周',
      },
      {
        key: '2020-04',
        value: '2020-04',
        children: targetChildren,
        isLeaf: false,
        totalField: '所有周',
      },
      {
        key: '2020-05',
        value: '2020-05',
        children: targetChildren,
        isLeaf: false,
        totalField: '所有周',
      },
      {
        key: '2020-06',
        value: '2020-06',
        children: targetChildren,
        isLeaf: false,
        totalField: '所有周',
      },
    ]
  } else if (
    [
      '2020-01',
      '2020-02',
      '2020-03',
      '2020-04',
      '2020-05',
      '2020-06',
      '2020-07',
      '2020-08',
      '2020-09',
      '2020-10',
      '2020-11',
      '2020-12',
    ].includes(keyPrefix)
  ) {
    return [
      {
        key: `${keyPrefix}-week-0`,
        value: '第一周',
        // data: '12%',
        isLeaf: true,
        children: targetChildren,
      },
      {
        key: `${keyPrefix}-week-1`,
        value: '第二周',
        // data: '24%',
        isLeaf: true,
        children: targetChildren,
      },
      {
        key: `${keyPrefix}-week-2`,
        value: '第三周',
        // data: '36%',
        isLeaf: true,
        children: targetChildren,
      },
      {
        key: `${keyPrefix}-week-3`,
        value: '第四周',
        // data: '48%',
        isLeaf: true,
        children: targetChildren,
      },
    ]
  } else if (keyPrefix === '下半年') {
    return [
      {
        key: '2020-07',
        value: '2020-07',
        children: targetChildren,
        isLeaf: false,
        totalField: '所有周',
      },
      {
        key: '2020-08',
        value: '2020-08',
        children: targetChildren,
        isLeaf: false,
        totalField: '所有周',
      },
      {
        key: '2020-09',
        value: '2020-09',
        children: targetChildren,
        isLeaf: false,
        totalField: '所有周',
      },
      {
        key: '2020-10',
        value: '2020-10',
        children: targetChildren,
        isLeaf: false,
        totalField: '所有周',
      },
      {
        key: '2020-11',
        value: '2020-11',
        children: targetChildren,
        isLeaf: false,
        totalField: '所有周',
      },
      {
        key: '2020-12',
        value: '2020-12',
        children: targetChildren,
        isLeaf: false,
        totalField: '所有周',
      },
    ]
  }
}

const makeLeftChildren = async (key: string): Promise<LeftCrossTreeNode[]> => [
  { key: `${key}-9`, value: '9:00-10:00', isLeaf: true, children: [] as any[] },
  { key: `${key}-10`, value: '10:00-11:00', isLeaf: true, children: [] },
  { key: `${key}-11`, value: '11:00-12:00', isLeaf: true, children: [] },
]

// const expandKeys = {
//   rowKeys: ['forenoon'] as string[],
//   colKeys: ['上半年'] as string[],
// }

const OperationsDiv = styled.div`
  display: flex;
  height: 20px;
  align-items: center;

  .item {
    height: 20px;
    cursor: pointer;
    color: #3858cf;
    display: flex;
    align-items: center;

    &.danger {
      color: #eb4141;
    }
  }

  .sep {
    height: 10px;
    width: 1px;
    margin-left: 12px;
    margin-right: 12px;
    background: #eeeeee;
  }
`

function App() {
  /** CrossTreeTable示例 */
  function handleDelete(path: string[]) {
    // console.log(path)
    setIsLoading(true)
    const leftPath = path[0]
      .split('|')[0]
      .split('_')
      .map((j: string) => j.split(':')[1])
    console.log(treePlugin.leftTree)
    // const leftTreeClone = deepClone(leftTree)
    dfs(treePlugin.leftTree)
    setLeftTree([...treePlugin.leftTree])
    setIsLoading(false)

    function dfs(leftTreeClone: LeftCrossTreeNode[]) {
      leftTreeClone.forEach((item: LeftCrossTreeNode, index: number) => {
        if (JSON.stringify(item.path) === JSON.stringify(leftPath)) {
          leftTreeClone.splice(index, 1)
          return
        }
        if (item.children && item.children.length) {
          dfs(item.children)
        }
      })
    }
  }

  function renderOptions(path: string[]) {
    return (
      <OperationsDiv>
        <div className="item" onClick={() => {}}>
          编辑
        </div>
        <div className="sep" />
        <div
          className="item danger"
          onClick={() => {
            handleDelete(path)
          }}
        >
          删除
        </div>
        <div className="sep" />
        {/* <Dropdown
        trigger={
          <div className="item">
            更多
            <icons.CaretDown style={{ color: '#A6A6A6' }} />
          </div>
        }
        triggerType="click"
      >
        <Menu>
          <Menu.Item>Option 1</Menu.Item>
          <Menu.Item>Option 2</Menu.Item>
          <Menu.Item>Option 3</Menu.Item>
          <Menu.Item>Option 4</Menu.Item>
        </Menu>
      </Dropdown> */}
      </OperationsDiv>
    )
  }

  // 维度层级必须按照数组顺序依次排列
  const [dimensionList, setDimensionList] = useState({ row: ['noon', 'time'], col: ['year', 'month', 'week'] })

  useEffect(() => {
    // const topTreeClone = deepClone(topTree)
    treePlugin.topTree.push({
      key: 'operation',
      lock: true,
      width: 200,
      value: '操作',
      isLeaf: true,
      render: renderOptions,
      children: [],
    })
    // setTopTree(topTree)
  }, [])

  const { treePlugin, setIsLoading, setLeftTree, setTopTree } = useTreePlugin({
    leftTreeConfig,
    topTreeConfig,
    makeTopChildren,
    makeLeftChildren,
    targetChildren,
    getValues,
    dimensionList,
  })

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
