import EventBus from 'event-bus'
import NoteListButton from './src/NoteListButton.vue'
import NoteList from './src/NoteList.vue'
import NoteListItem from './src/NoteListItem.vue'

export const NoteListKey = Symbol('note-list')

EventBus.on(NoteListKey, () => {})

export default function () {
  return {
    NoteListButton,
    NoteList,
    NoteListItem,
  }
}
