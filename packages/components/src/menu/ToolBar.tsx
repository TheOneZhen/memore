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

/**
 * 最后需要形成配置项，然后在不同平台提供
 */

/**
 * 布局模式
 * 1. PC + WEB：当内容超出时，隐藏超出内容到一个按钮下，悬浮此按钮时显示隐藏内容
 * 2. 手机端：超出内容隐藏到百宝箱功能，点击百宝箱功能弹出全部功能页面。
 * 
 * 所有布局模式下都支持拖拽展示按钮
 */