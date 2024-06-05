<script lang="ts" setup>
import { FunctionItem } from 'function-unit'
import type { NoteListItemProps } from '../'

const { title, description, icon } = defineProps<NoteListItemProps>()
</script>

<template>
  <function-item :description="description">
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
