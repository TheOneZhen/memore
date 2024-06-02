import A from './src/FunctionContainer.vue'
import B from './src/FunctionItem.vue'

export interface FunctionItemProps {
  initial?: number
  max?: number
  min?: number
  isConstant?: boolean
}

export const FunctionContainer = A
export const FunctionItem = B
