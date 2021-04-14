import { ReactNode } from 'react'
import { ArtColumnStaticPart, CellProps } from '../../interfaces'

interface IndicatorNodeLinkCell {
  component: 'Link'
  componentProps: {
    href: string
    target?: '_blank' | '_self'
  }
}

interface IndicatorNodeTrendCell {
  component: 'Trend'
}

export interface CrossTableIndicator extends ArtColumnStaticPart {
  code: string
  expression?: string
}

// hidden 是固定的，故从 ArtColumnStaticPart 中排除
export interface CrossTableLeftMetaColumn extends Omit<ArtColumnStaticPart, 'hidden'> {
  /** 自定义渲染方法 */
  render?(leftNode: LeftCrossTreeNode, leftDepth: number): ReactNode

  /** 自定义的获取单元格 props 的方法 */
  getCellProps?(leftNode: LeftCrossTreeNode, leftDepth: number): CellProps
}

export interface CrossTreeNode {
  key?: string
  value: string
  title?: ReactNode
  data?: any
  hidden?: boolean
  children?: CrossTreeNode[]
  isLeaf?: boolean
}

/** 交叉表左侧树状结构的树节点 */
export interface LeftCrossTreeNode extends CrossTreeNode {
  children?: CrossTreeNode[]
  isLeaf?: boolean
  dimension?: string
  path?: string[]
}

/** 交叉表上方树状结构的树节点
 * 列的名称现由 value 字段提供，故从 ArtColumnStaticPart 移除了 name 字段 */
export interface TopCrossTreeNode extends CrossTreeNode, Omit<ArtColumnStaticPart, 'name'> {
  children?: TopCrossTreeNode[]
  isLeaf?: boolean
  totalField?: string
  dimension?: string
  path?: string[]
  expanded?: boolean
  renderFun?(leftTree: LeftCrossTreeNode[], topTree: TopCrossTreeNode[], path: string[]): ReactNode
}

// 描述指标数组indicatorList
export interface IndicatorNode extends Omit<CrossTreeNode, 'value' | 'children'> {
  value?: string
  sortable?: boolean
  dataIndex?: string
  path?: string[]
  cell?: IndicatorNodeLinkCell | IndicatorNodeTrendCell
  children: IndicatorNode[]
}
