import NoteListButton from './src/NoteListButton.vue'
import NoteList from './src/NoteList.vue'
import NoteListItem from './src/NoteListItem.vue'
export interface NoteListItemProps {
  id: string
  title: string
  description: string
  icon?: string
  remotes: number
  locals: number
  openNote: (id: NoteListItemProps['id']) => void
}

export default function () {
  return {
    NoteListButton,
    NoteList,
    NoteListItem,
  }
}
