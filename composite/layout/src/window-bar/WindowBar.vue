<script lang="ts" setup>
import { NoteListButton } from 'note-list'
</script>

<template>
  <div class="window-bar">
    <div class="col1">
      <NoteListButton />
    </div>
  </div>
</template>

<style lang="scss">
.window-bar {
  // https://www.electronjs.org/docs/latest/tutorial/window-customization#set-custom-draggable-region
  -webkit-app-region: drag;
  display: flex;
  justify-content: space-between;
  width: 100w;
  height: 60px;
  .col2 {
    flex: 1;
    text-align: center;
  }
  > * {
    -webkit-app-region: no-drag;
  }
}
</style>
