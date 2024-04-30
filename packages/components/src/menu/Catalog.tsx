import React, { forwardRef, useContext } from 'react'
import MenuContext, { MenuContextProps } from './MenuContext'
import type { RepoData } from './Menu'

export interface CatalogProps {
  data: RepoData
}

const Catalog = function ({ data }: CatalogProps) {
  const context = useContext<MenuContextProps>(MenuContext)

  return <></>
}

export default Catalog
