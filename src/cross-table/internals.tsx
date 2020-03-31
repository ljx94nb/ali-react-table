import { ArtColumn, SpanRect } from '../interfaces'
import { ROW_KEY } from './constants'
import { LeftCrossTreeNode } from './interfaces'

export interface CrossTableRenderRow {
  [ROW_KEY]: string

  /** 行上所有左侧单元格 的合并信息 */
  rects: SpanRect[]

  /** 行上所有左侧单元格 上的树节点 */
  nodes: LeftCrossTreeNode[]
}

export interface CrossTableLeftColumn extends ArtColumn {
  columnType: 'left'
  children?: never
}

export interface CrossTableDataColumn extends ArtColumn {
  columnType: 'data'
}

export interface CrossTableDataParentColumn extends ArtColumn {
  columnType: 'data-parent'
  children: (CrossTableDataParentColumn | CrossTableDataColumn)[]
}

export type CrossTableRenderColumn = CrossTableLeftColumn | CrossTableDataColumn | CrossTableDataParentColumn
