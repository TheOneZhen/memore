export interface NoteListItemProps {
  id: string
  title: string
  description: string
  icon?: string
  remotes: number
  locals: number
  openNote: (id: NoteListItemProps['id']) => void
}
