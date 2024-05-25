<script lang="ts" setup>
import { FunctionItem } from 'function-unit'

const { icon, title, description, remotes, locals } = defineProps<{
  icon?: string
  title: string
  description: string
  remotes: number
  locals: number
}>()
</script>

<template>
  <function-item :description="description" />
</template>

<style lang="scss"></style>
