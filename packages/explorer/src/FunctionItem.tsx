import { Flex, Tooltip } from 'antd'
import React, { useImperativeHandle, useState } from 'react'

export interface FunctionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  level: number
  description: string
  initialWidth: number
}

export default React.forwardRef(function ({
  description,
  children,
  initialWidth,
  
}: FunctionItemProps, ref) {

  const [itemWidth, setItemWidth] = useState(initialWidth)

  useImperativeHandle(ref, () => {
    setItemWidth
  })
  
  return (
    <Tooltip title={description}>
      <Flex align="center" justify="space-between">
        {children}
      </Flex>
    </Tooltip>
  )
})
