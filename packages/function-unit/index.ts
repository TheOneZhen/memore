export { default as FunctionContainer } from './src/FunctionContainer.vue'
export { default as FunctionItem } from './src/FunctionItem.vue'

export interface FunctionItemProps {
  initial?: number
  max?: number
  min?: number
  isConstant?: boolean
}

export interface FunctionContainerProps {
  initialSize?: number
}
