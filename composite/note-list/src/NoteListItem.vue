<script lang="ts" setup>
import { FunctionItem } from 'function-unit'
import type { NoteListItemProps } from '../typings/'
const { title, description, remotes, locals } = defineProps<NoteListItemProps>()
</script>

<template>
  <function-item :description="description">
    <slot name="icon">
      <el-icon
        icon-line-md:clipboard-twotone-to-clipboard-twotone-check-transition
      />
      <span>{{ title }}</span>
    </slot>
  </function-item>
</template>

<style lang="scss"></style>
