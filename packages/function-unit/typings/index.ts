export interface FunctionItemProps {
  description: string
  initialWidth: number
  maxWidth: number
  minWidth: number
}

export interface FunctionContainerProps {
  data: Array<any>
  /** initial width of item button */
  initialWidth: FunctionItemProps['initialWidth']
  /** add a new item */
  addNewItem: () => void
}
