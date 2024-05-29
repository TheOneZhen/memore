<script lang="ts" setup>
import { FunctionItem } from 'function-unit'
import type { NoteListItemProps } from '../typings/'
const { title, description, icon, id, openNote } =
  defineProps<NoteListItemProps>()
</script>

<template>
  <function-item :description="description" @click="openNote(id)">
    <el-icon v-if="icon">
      <img :src="icon" />
    </el-icon>
    <el-icon
      v-else
      icon-line-md:clipboard-twotone-to-clipboard-twotone-check-transition
    />
    <span>{{ title }}</span>
  </function-item>
</template>

<style lang="scss"></style>
