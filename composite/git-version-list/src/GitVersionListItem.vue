<script lang="ts" setup>
import { FunctionItem } from 'function-unit'
import type { GitVersionListItemProps } from '../'

const { title, description, icon } = defineProps<GitVersionListItemProps>()
</script>

<template>
  <FunctionItem :title="description">
    <ElIcon v-if="icon">
      <img :src="icon" />
    </ElIcon>
    <ElIcon v-else icon-line-md:github />
    <span>{{ title }}</span>
  </FunctionItem>
</template>

<style lang="scss"></style>
