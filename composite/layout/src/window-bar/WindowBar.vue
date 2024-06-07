<script lang="ts" setup>
import { ref } from 'vue'
import { NoteList, NoteListButton } from 'note-list'
import { ElDialog, ElIcon } from 'element-plus'
import type { Component } from 'vue'

const dialogContent = ref<null | Component>(null)
const isDialogShow = ref(false)

function handleNoteListButton() {
  console.log('run here')
  dialogContent.value = NoteList
  isDialogShow.value = true
}
</script>

<template>
  <div class="window-bar" @click="handleNoteListButton">
    <div class="window-bar-col1">
      <NoteListButton />
    </div>
    <div class="window-bar-col2">
      <el-icon icon-charm:link />
    </div>
    <div class="window-bar-col3">{{ 'this is title!' }}</div>
    <div class="window-bar-col4">
      <el-icon icon-charm:sun />
      <el-icon icon-charm:sun />
      <el-icon icon-charm:sun />
    </div>
    <div class="window-bar-col5">
      <el-icon icon-mi:remove />
      <el-icon icon-mi:expand />
      <!-- mi:minimize -->
      <el-icon icon-mi:close />
    </div>
  </div>
  <ElDialog
    v-model="isDialogShow"
    :modal="false"
    append-to-body
    :lock-scroll="false"
    show-close
    draggable
  >
    <component :is="dialogContent" />
  </ElDialog>
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
    cursor: pointer;
  }
}
</style>
