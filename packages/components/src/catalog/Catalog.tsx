import { forwardRef } from 'react'
import type { MenuProps as AntMenuProps } from 'antd'

export type MenuProps = {
  isCollapse: boolean
}

const Menu = forwardRef<{}, MenuProps>((props, ref) => {
  return <></>
})

export default Menu
