<script lang="ts" setup>
import { NoteList, NoteListButton, NoteListPrefix } from 'note-list'
import { ElIcon, ElTooltip } from 'element-plus'
import {
  GitVersionList,
  GitVersionListButton,
  GitVersionListPrefix,
} from 'git-version-list'
import { FunctionContainer } from 'function-unit'
import { UseSiderbarStore } from '../sider-bar'

const { add } = UseSiderbarStore()
</script>

<template>
  <div class="window-bar">
    <FunctionContainer>
      <ElTooltip :content="NoteListPrefix">
        <NoteListButton @click="add(NoteList)" />
      </ElTooltip>
      <ElTooltip :content="GitVersionListPrefix">
        <GitVersionListButton @click="add(GitVersionList)" />
      </ElTooltip>
    </FunctionContainer>
    <div class="window-bar-col2"><ElIcon icon-charm:link /></div>
    <div class="window-bar-col3">{{ 'this is title!' }}</div>
    <div class="window-bar-col4">
      <ElIcon icon-charm:sun />
      <ElIcon icon-charm:sun />
      <ElIcon icon-charm:sun />
    </div>
    <div class="window-bar-col5">
      <ElIcon icon-mi:remove />
      <ElIcon icon-mi:expand />
      <!-- mi:minimize -->
      <ElIcon icon-mi:close />
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
    cursor: pointer;
  }
  .el-icon {
    font-size: 24px;
  }
}
</style>
