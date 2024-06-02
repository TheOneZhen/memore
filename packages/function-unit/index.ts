import A from './src/FunctionContainer.vue'
import B from './src/FunctionItem.vue'
export interface FunctionItemProps {
  description: string
  initialWidth?: number
  maxWidth?: number
  minWidth?: number
}

export interface FunctionContainerProps {}

export const FunctionContainer = A
export const FunctionItem = B
