import React from 'react'
import { Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'

export interface SearchProps extends React.HTMLAttributes<HTMLElement> {
  handleOnchange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const Search = React.forwardRef<HTMLElement, SearchProps>(props => {
  const { handleOnchange } = props

  return (
    <Input
      placeholder="Search..."
      prefix={<SearchOutlined />}
      onChange={handleOnchange}
    />
  )
})

export default Search
