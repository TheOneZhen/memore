import React from 'react'
import Search, { SearchProps } from './Search'

export interface ExplorerProps extends React.HTMLAttributes<HTMLElement>, SearchProps {
  requestAddNewRepo: Function
}

const Explorer = React.forwardRef<HTMLElement, ExplorerProps>(
  (props, ref) => {
    const { requestAddNewRepo, handleOnchange } = props
    return (
      <Search handleOnchange={handleOnchange} />
    )
  },
)
