<script lang="ts" setup>
import { defineProps, ref } from 'vue'
import { ElTooltip } from 'element-plus'
import type { FunctionItemProps } from '../types'

const { description, initialWidth, maxWidth, minWidth } =
  defineProps<FunctionItemProps>()

const currentWidth = ref(initialWidth)
</script>

<template>
  <ElTooltip :content="description">
    <div class="function-item" :style="{ width: currentWidth }">
      <slot></slot>
    </div>
  </ElTooltip>
</template>

<style lang="scss">
.function-item {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
}
</style>
