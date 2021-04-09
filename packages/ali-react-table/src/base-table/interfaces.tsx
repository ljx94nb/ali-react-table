import React from 'react'
import { ArtColumn, SortOrder } from '../interfaces'
import { LeftCrossTreeNode, TopCrossTreeNode } from '../pivot/cross-table'

export type VirtualEnum = false | true | 'auto'

export interface VerticalRenderRange {
  topIndex: number
  topBlank: number
  bottomIndex: number
  bottomBlank: number
}

export interface HorizontalRenderRange {
  leftIndex: number
  leftBlank: number
  rightIndex: number
  rightBlank: number
}

// VisibleColumnDescriptor 用于在表格内部描述「那些在页面中可见的列」
export type VisibleColumnDescriptor =
  | { type: 'blank'; blankSide: 'left' | 'right'; width: number }
  | { type: 'normal'; colIndex: number; col: ArtColumn }

export interface ResolvedUseVirtual {
  horizontal: boolean
  vertical: boolean
  header: boolean
}

export interface RenderInfo {
  verticalRenderRange: VerticalRenderRange
  horizontalRenderRange: HorizontalRenderRange
  visible: VisibleColumnDescriptor[]

  flat: { full: ArtColumn[]; left: ArtColumn[]; center: ArtColumn[]; right: ArtColumn[] }
  nested: { full: ArtColumn[]; left: ArtColumn[]; center: ArtColumn[]; right: ArtColumn[] }
  stickyLeftMap: Map<number, number>
  stickyRightMap: Map<number, number>
  useVirtual: ResolvedUseVirtual

  /** props.columns 是否包含有效的锁列 */
  hasLockColumn: boolean
  /** 左侧锁定列的总宽度 */
  leftLockTotalWidth: number
  /** 右侧锁定列的总宽度 */
  rightLockTotalWidth: number
}

// pagenationPlugin的结构
export interface IPaginationPluginValue {
  data?: any[]
  onChange?(currentPage: number): void
}

export interface SortOptions {
  rowSortKeys: string[]
  targetKey: string
  sortOrder: SortOrder
}

export interface TreePluginValue {
  getValues(requestPathArr: string[], targets: string[], sortOptions: SortOptions): Promise<any>
  openKeys?: string[]
  targetChildren?: any[]
  makeTopChildren?(keyPrefix: string, dimension: string, targetKeys: string[]): Promise<TopCrossTreeNode[]>
  makeLeftChildren?(keyPrefix: string, dimension: string): Promise<LeftCrossTreeNode[]>
  isLeafNode?(node: any, nodeMeta: any): boolean
  expandKeys?: { rowKeys: string[]; colKeys: string[] }
  dimensionList: { row: string[]; col: string[] }
  treeInit?(leftTree: LeftCrossTreeNode[], topTree: TopCrossTreeNode[]): Promise<void>
}

// pipeline的plugins对象结构
export interface PipelinePlugin {
  paginationPlugin: IPaginationPluginValue
}
