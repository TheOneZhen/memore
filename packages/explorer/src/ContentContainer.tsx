import { Flex } from 'antd'
import React from 'react'

export interface ContentContainerItemProps extends React.HTMLAttributes<HTMLDivElement> {
}

export interface ContentContainerProps<T> {
  layout: 'list' | 'icon'
  item: React.ReactNode
  data: Array<T>
}

const ContentContainerItem = function ({ children }: ContentContainerItemProps) {
  return (
    <div>{children}</div>
  )
}

export const ContentContainer = function <T>({}: ContentContainerProps<T>) {
  return <div></div>
}
