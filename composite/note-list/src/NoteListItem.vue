<script lang="ts" setup>
import { FunctionItem } from 'function-unit'

const { icon, title, description, remotes, locals } = defineProps<{
  title: string
  description: string
  remotes: number
  locals: number
}>()
</script>

<template>
  <function-item :description="description">
    <slot name="icon">
      <el-icon
        icon-line-md:clipboard-twotone-to-clipboard-twotone-check-transition
      />
    </slot>
  </function-item>
</template>

<style lang="scss"></style>
