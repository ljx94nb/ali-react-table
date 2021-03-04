import React, { ReactNode } from 'react'
import { Classes } from './styles'

const DefaultLoadingIcon = React.memo(() => (
  <svg
    style={{ margin: 'auto', display: 'block', width: 40, height: 40 }}
    viewBox="0 0 100 100"
    preserveAspectRatio="xMidYMid"
  >
    <circle
      cx="50"
      cy="50"
      r="40"
      fill="none"
      stroke="#23a7fa"
      strokeDasharray="188 64"
      strokeLinecap="round"
      strokeWidth="10"
    >
      <animateTransform
        attributeName="transform"
        dur="1.5s"
        keyTimes="0;1"
        repeatCount="indefinite"
        type="rotate"
        values="0 50 50;360 50 50"
      />
    </circle>
  </svg>
))

export interface LoadingContentWrapperProps {
  visible: boolean
  children: ReactNode
}

/**
 * 表格加载数据时包裹数据body的盒子
 * 改造：加入pointEventer当加载数据时表格数据不可操作
 */
function DefaultLoadingContentWrapper({ children, visible }: LoadingContentWrapperProps) {
  // visible 表示表格是否处于加载状态中
  // children 是表格的实际内容
  return (
    <div
      className="art-loading-content-wrapper"
      style={{ filter: visible ? 'blur(1px)' : 'none', pointerEvents: visible ? 'none' : 'auto' }}
    >
      {children}
    </div>
  )
}

interface LoadingProps {
  visible: boolean
  children: ReactNode
  LoadingContentWrapper?: React.ComponentType<LoadingContentWrapperProps>
  LoadingIcon?: React.ComponentType
}

export default function Loading({
  visible,
  children,
  LoadingContentWrapper = DefaultLoadingContentWrapper,
  LoadingIcon = DefaultLoadingIcon,
}: LoadingProps) {
  return (
    <div className={Classes.loadingWrapper}>
      {visible && (
        <div className={Classes.loadingIndicatorWrapper}>
          <div className={Classes.loadingIndicator}>
            <LoadingIcon />
          </div>
        </div>
      )}
      <LoadingContentWrapper visible={visible} children={children} />
    </div>
  )
}
