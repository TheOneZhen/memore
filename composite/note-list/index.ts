import { useEventBus } from '@vueuse/core'
import NoteListButton from './src/NoteListButton.vue'
import NoteList from './src/NoteList.vue'
import NoteListItem from './src/NoteListItem.vue'

export default function (eventBus: Function) {
  return {
    NoteListButton,
    NoteList,
    NoteListItem,
  }
}
