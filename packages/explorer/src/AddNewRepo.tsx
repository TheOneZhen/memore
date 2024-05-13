import { Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

function addNew () {
  console.log(`click add new repo`)
}

const AddNewRepo = function () {
  return <Button icon={<PlusOutlined />} onClick={addNew} />
}

export default AddNewRepo
