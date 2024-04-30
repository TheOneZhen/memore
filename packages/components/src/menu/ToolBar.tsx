import { Button, Flex } from 'antd'
import MenuContext, { MenuContextProps } from './MenuContext'
import { Dispatch, SetStateAction, useContext } from 'react'
import {
  UserOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SettingOutlined,
  RedoOutlined,
} from '@ant-design/icons'

export type ToolBarProps = {
  setIsCollapse: Dispatch<SetStateAction<boolean>>
}

const ToolBar = function ({ setIsCollapse }: ToolBarProps) {
  const { isCollapse } = useContext<MenuContextProps>(MenuContext)

  return (
    <Flex>
      <Button shape="circle" icon={<UserOutlined />}></Button>
      <Button shape="circle" icon={<SettingOutlined />}></Button>
      <Button shape="circle" icon={<RedoOutlined />}></Button>
      <div style={{ flex: 'auto' }}>
        <Button
          onClick={() => setIsCollapse(!isCollapse)}
          icon={isCollapse ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        ></Button>
      </div>
    </Flex>
  )
}

export default ToolBar
