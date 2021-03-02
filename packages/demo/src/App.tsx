/*** src/index.js ***/
import React, { useState, useEffect } from 'react'
import { requestData, requestDetailData } from './request'
import * as fusion from '@alifd/next'
import { ratio, addChildren } from './utils'
import { BaseTable, ArtColumn, useTablePipeline, features } from 'ali-react-table'

function App() {
  const columns: ArtColumn[] = [
    {
      code: 'name',
      name: '数据维度',
      lock: true,
      width: 200,
      // 通过自定义 getValue，可以实现「根据节点深度选取合适的数据字段」
      // getValue(record: any) {
      //   const meta = record[treeMetaSymbol]
      //   const array = [record.subsidiary_name, record.city_name, record.shop_name]
      //   return array[meta.depth]
      // },
    },
    { code: 'shop_name', name: '门店' },
    { code: 'imp_uv_dau_pct', name: '曝光UV占DAU比例', render: ratio, align: 'right' },
    { code: 'app_qty_pbt', name: 'APP件单价', align: 'right' },
    { code: 'all_app_trd_amt_1d', name: 'APP成交金额汇总', align: 'right' },
  ]

  const [state, setState] = useState({ isLoading: true, data: [] as any[] })
  const [openKeys, onChangeOpenKeys] = useState([])

  useEffect(() => {
    requestData({ url: 'data' }).then((data) => {
      console.log(data)
      setState({ isLoading: false, data: data as any[] })
    })
  }, [])

  const loadNodeDataByParentKey = async (keyPath: string[]) => {
    setState((prev) => ({ isLoading: true, data: prev.data }))
    const keyData = await requestDetailData({ key: keyPath[keyPath.length - 1] })
    const data = addChildren(state.data, keyData as any[], keyPath)
    console.log(data)
    setState({
      isLoading: false,
      data,
    })
  }

  const pipeline = useTablePipeline({ components: fusion }) // 传组件定义表格的总体样式
    .input({ dataSource: state.data, columns }) // 输入datasource和列项目
    .primaryKey('id') // 输入每一行的唯一id
    // .use(features.buildTree('id', 'parent_id')) // 利用use为表格添加功能，这里把数据处理成数状结构
    .use(
      features.treeMode({
        defaultOpenKeys: ['name'],
        onChangeOpenKeys(nextKeys, key, action, pathArr) {
          console.log(nextKeys, key, action, pathArr)
          if (state.isLoading) {
            return
          }
          onChangeOpenKeys(nextKeys)

          const needLoadData = state.data.every((d) => d.parent_id !== key)
          if (action === 'expand' && needLoadData) {
            // 如果当前展开了某一个节点，且该节点的子节点数据尚未加载，
            //  则调用 loadNodeDataByParentKey 加载更多数据
            const paths = pathArr.map((i) => i.key)
            loadNodeDataByParentKey(paths)
          }
        },
        // 提供一个自定义的 isLeafNode 方法，使得表格为父节点正确渲染收拢/展开按钮
        isLeafNode(node) {
          return node.children === undefined
        },
      }),
    ) // 设置节点的展开功能：哪个节点展开、展开的回调等

  return <BaseTable {...pipeline.getProps()} />
}

export default App
