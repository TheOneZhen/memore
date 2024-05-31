import { useEventBus } from '@vueuse/core'
import NoteListButton from './src/NoteListButton.vue'
import NoteList from './src/NoteList.vue'
import NoteListItem from './src/NoteListItem.vue'
import type { EventBusKey } from '@vueuse/core'

export const NoteListKey: EventBusKey<{ name: string }> = Symbol('note-list')

export const NoteListEventBus = useEventBus(NoteListKey)

export default function () {
  return {
    NoteListButton,
    NoteList,
    NoteListItem,
  }
}
