import { createContext } from 'react'

export interface MenuContextProps {
  isCollapse: boolean
}

const MenuContext = createContext<MenuContextProps>({
  isCollapse: false
})

export default MenuContext