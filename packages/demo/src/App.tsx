/*** src/index.js ***/
// import React, { useState, useEffect } from 'react'
// import { requestData, requestDetailData } from './request'
// import * as fusion from '@alifd/next'
// import { ratio, addChildren } from './utils'
// import { BaseTable, ArtColumn, useTablePipeline, features, PaginationPlugin, usePlugins } from 'ali-react-table'

import React, { useEffect, useState } from 'react'
import { BaseTable, useTreePlugin, useTablePipeline, features, ArtColumn } from 'ali-react-table'
import { CrossTreeTable, TopCrossTreeNode, LeftCrossTreeNode } from 'ali-react-table/pivot'
import _ from 'lodash'
import { getValues } from './mock/tableCellConfig'
import { format, cdnData } from '../../website/src/assets'

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

const expandKeys = {
  rowKeys: [] as string[],
  colKeys: [] as string[],
}

function App() {
  // const columns: ArtColumn[] = [
  //   {
  //     code: 'name',
  //     name: '数据维度',
  //     lock: true,
  //     width: 200,
  //     // 通过自定义 getValue，可以实现「根据节点深度选取合适的数据字段」
  //     // getValue(record: any) {
  //     //   const meta = record[treeMetaSymbol]
  //     //   const array = [record.subsidiary_name, record.city_name, record.shop_name]
  //     //   return array[meta.depth]
  //     // },
  //   },
  //   { code: 'shop_name', name: '门店' },
  //   { code: 'imp_uv_dau_pct', name: '曝光UV占DAU比例', render: ratio, align: 'right' },
  //   { code: 'app_qty_pbt', name: 'APP件单价', align: 'right' },
  //   { code: 'all_app_trd_amt_1d', name: 'APP成交金额汇总', align: 'right' },
  // ]

  // const [state, setState] = useState({ isLoading: true, data: [] as any[] })
  // const [openKeys, onChangeOpenKeys] = useState([])

  // useEffect(() => {
  //   requestData({ url: 'data' }).then((data) => {
  //     console.log(data)
  //     setState({ isLoading: false, data: data as any[] })
  //   })
  // }, [])

  // const loadNodeDataByParentKey = async (keyPath: string[]) => {
  //   setState((prev) => ({ isLoading: true, data: prev.data }))
  //   const keyData = await requestDetailData({ key: keyPath[keyPath.length - 1] })
  //   const data = addChildren(state.data, keyData as any[], keyPath)
  //   console.log(data)
  //   setState({
  //     isLoading: false,
  //     data,
  //   })
  //   return keyData
  // }

  // const { plugins, setPlugins } = usePlugins()

  // const pipeline = useTablePipeline({ components: fusion }) // 传组件定义表格的总体样式
  //   .input({ dataSource: state.data, columns }) // 输入datasource和列项目
  //   .primaryKey('id') // 输入每一行的唯一id
  //   // .use(features.buildTree('id', 'parent_id')) // 利用use为表格添加功能，这里把数据处理成数状结构
  //   .use(
  //     features.treeMode({
  //       openKeys,
  //       onChangeOpenKeys(nextKeys, key, action, pathArr) {
  //         console.log(nextKeys, key, action, pathArr)
  //         if (state.isLoading) {
  //           return
  //         }
  //         onChangeOpenKeys(nextKeys)

  //         const needLoadData = state.data.every((d) => d.parent_id !== key)
  //         if (action === 'expand' && needLoadData) {
  //           // 如果当前展开了某一个节点，且该节点的子节点数据尚未加载，
  //           //  则调用 loadNodeDataByParentKey 加载更多数据
  //           const paths = pathArr.map((i) => i.key)
  //           loadNodeDataByParentKey(paths).then((data) => {
  //             setPlugins(
  //               new PaginationPlugin('paginationPlugin', {
  //                 data: data as any,
  //                 onChange: (currentPage) => {},
  //               }),
  //             )
  //           })
  //         }
  //       },
  //       // 提供一个自定义的 isLeafNode 方法，使得表格为父节点正确渲染收拢/展开按钮
  //       isLeafNode(node) {
  //         return node.children === undefined
  //       },
  //     }),
  //   ) // 设置节点的展开功能：哪个节点展开、展开的回调等

  // // console.log(plugins)
  // return <BaseTable defaultColumnWidth={120} isLoading={state.isLoading} {...pipeline.getProps()} plugins={plugins} />

  /** CrossTreeTable示例 */
  const { treePlugin } = useTreePlugin({
    leftTreeConfig,
    topTreeConfig,
    makeTopChildren,
    makeLeftChildren,
    targetChildren,
    expandKeys,
    getValues,
  })

  // const ALL_DIMS = [
  //   { code: 'planet', name: '子公司' },
  //   { code: 'season', name: '季度' },
  //   { code: 'month', name: '月份' },
  //   { code: 'area', name: '门店' },
  //   { code: 'one', name: '一级类目' },
  //   { code: 'two', name: '二级类目' },
  //   { code: 'three', name: '三级类目' },
  // ]

  // const INDICATORS = [
  //   {
  //     code: 'a',
  //     name: '目标收入',
  //     align: 'right' as const,
  //     render: amount,
  //     features: { sortable: true },
  //     expression: 'SUM(a)',
  //   },
  //   {
  //     code: 'b',
  //     name: '实际收入',
  //     render: amount,
  //     align: 'right' as const,
  //     features: { sortable: true },
  //     expression: 'SUM(b)',
  //   },
  //   {
  //     code: 'c',
  //     name: '上月收入',
  //     render: amount,
  //     hidden: true,
  //     align: 'right' as const,
  //     features: { sortable: true },
  //     expression: 'SUM(c)',
  //   },
  //   {
  //     code: 'lfl',
  //     name: '收入月环比',
  //     render: lfl,
  //     align: 'right' as const,
  //     features: { sortable: true },
  //     expression: '(a - c) / a',
  //   },
  //   {
  //     code: 'd',
  //     name: '重点商品收入',
  //     render: amount,
  //     align: 'right' as const,
  //     features: { sortable: true },
  //     expression: 'SUM(d)',
  //   },
  //   {
  //     code: 'rate',
  //     name: '重点商品收入占比',
  //     render: ratio,
  //     align: 'right' as const,
  //     features: { sortable: true },
  //     expression: 'd / b',
  //   },
  // ]

  // const [pivot] = useState(() => {
  //   return new Pivot({
  //     allDimensions: ALL_DIMS,
  //     allIndicators: INDICATORS,
  //     dimCodes: ['planet', 'area', 'season'],
  //   })
  // })

  // const [pivotView] = useState(() => new PivotView(pivot))
  // console.log(pivot)

  // useEffect(() => {
  //   getIncomeData().then(
  //     action((data: any[]) => {
  //       pivot.data = data
  //       pivot.isLoading = false
  //       pivot.filters = Object.fromEntries(
  //         pivot.allDimensions.map((dim) => {
  //           return [dim.code, _.uniq(data.map((d) => d[dim.code]))]
  //         }),
  //       )
  //     }),
  //   )
  // }, [])

  // const { recordMap, leftTree, topTree } = pivotView
  // console.log(leftTree, topTree)

  // const { ratio } = format

  // const columns: ArtColumn[] = [
  //   { code: 'name', name: '数据维度', lock: true, width: 160 },
  //   { code: 'shop_name', name: '门店', features: { sortable: true } },
  //   { code: 'imp_uv_dau_pct', name: '曝光UV占DAU比例', render: ratio, align: 'right', features: { sortable: true } },
  //   { code: 'app_qty_pbt', name: 'APP件单价', align: 'right', features: { sortable: true } },
  //   { code: 'all_app_trd_amt_1d', name: 'APP成交金额汇总', align: 'right', features: { sortable: true } },
  // ]

  // const [state, setState] = useState({ isLoading: true, data: [] })

  // useEffect(() => {
  //   cdnData.getAppTrafficData().then((data) => {
  //     setState({ isLoading: false, data })
  //   })
  // }, [])

  // const pipeline = useTablePipeline()
  // .input({ columns, dataSource: state.data })
  // .primaryKey('id')
  // .use(features.buildTree('id', 'parent_id'))
  // .use(features.sort({ mode: 'single', highlightColumnWhenActive: true }))
  // .use(features.treeMode({ defaultOpenKeys: ['B2C'] }))

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
        // leftTree={leftTree}
        // topTree={topTree}
        // getValue={getValue}
        // isLeafNode={isLeafNode}
        {...treePlugin}
        // isLoading={state.isLoading}
        // {...pipeline.getProps()}
      />
    </div>
    // <div>
    //   <CrossTreeTable
    //     style={{ marginTop: 8 }}
    //     primaryColumn={{
    //       lock: true,
    //       name: '数据维度',
    //       width: 180,
    //     }}
    //     defaultColumnWidth={120}
    //     isLoading={pivot.isLoading}
    //     leftTree={leftTree}
    //     topTree={topTree}
    //     getValue={(leftNode, topNode) => {
    //       const record = recordMap.get(leftNode.key)
    //       const ind = topNode.data.indicator
    //       console.log(record, ind)
    //       return record?.[ind.code]
    //     }}
    //     render={(value, leftNode, topNode) => {
    //       const ind = topNode.data.indicator
    //       return ind.render ? ind.render(value) : value
    //     }}
    //   />
    // </div>
  )
}

export default App
