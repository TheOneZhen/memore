<script lang="ts" setup>
import { FunctionItem } from 'function-unit'
import { ElIcon } from 'element-plus'
import type { NoteListItemProps } from '../'

const { title, description, icon } = defineProps<NoteListItemProps>()
</script>

<template>
  <FunctionItem :description="description">
    <ElIcon v-if="icon">
      <img :src="icon" />
    </ElIcon>
    <ElIcon
      v-else
      icon-line-md:clipboard-twotone-to-clipboard-twotone-check-transition
    />
    <span>{{ title }}</span>
  </FunctionItem>
</template>

<style lang="scss"></style>
