import { Button, ButtonProps, Tooltip } from 'antd'
import React from 'react'

export interface FunctionButtonProps extends ButtonProps {
  title: string
  description: string
}

export default function ({
  title,
  description,
  icon,
  onClick
}: FunctionButtonProps) {
  return (
    <Tooltip title={description}>
      <Button icon={icon} onClick={onClick}>{title}</Button>
    </Tooltip>
  )
}
