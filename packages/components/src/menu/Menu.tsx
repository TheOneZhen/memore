import { useState, forwardRef, useContext, useMemo } from 'react'
import MenuContext, { MenuContextProps } from './MenuContext'
import ToolBar from './ToolBar'

export type MenuProps = {}
export type ToolBarProps = {}
export type RepoData = Array<{
  key: string
  name: string
  state: 'private' | 'public'
}>

const Menu = forwardRef<HTMLElement, MenuProps>((props, ref) => {
  const [isCollapse, setIsCollapse] = useState(false)
  const [width] = useState(200) // unit: pixel
  const context: MenuContextProps = {
    isCollapse,
  }

  return (
    <MenuContext.Provider value={context}>
      <ToolBar setIsCollapse={setIsCollapse}></ToolBar>
    </MenuContext.Provider>
  )
})

export default Menu
