export { default as NoteListButton } from './src/NoteListButton.vue'
export { default as NoteList } from './src/NoteList.vue'
export { default as NoteListItem } from './src/NoteListItem.vue'
export { prefix as NoteListPrefix } from './src/common'
export interface NoteListProps {
  data: Array<NoteListItemProps>
  openNote: (id: NoteListItemProps['id']) => void
}
export interface NoteListItemProps {
  id: string
  title: string
  description: string
  icon?: string
  remotes: number
  locals: number
}
