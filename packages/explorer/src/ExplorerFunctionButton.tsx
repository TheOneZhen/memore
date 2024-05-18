import { UnorderedListOutlined } from '@ant-design/icons'
import FunctionButton from './FunctionButton'

export default function () {
  return (
    <FunctionButton
      title=""
      description="List of memore suppored memo repositories."
      icon={<UnorderedListOutlined />}
    ></FunctionButton>
  )
}
