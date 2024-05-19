<script lang="ts" setup>
import { defineProps, ref } from 'vue'
import { ElTooltip } from 'element-plus'
import type { FunctionItemProps } from '../typings'
/**
 * 样式效果预览
 * 通过控制currentWidth来控制组件的宽度，然后借助外部container的布局来达到交互效果
 */
const { description, initialWidth } = defineProps<FunctionItemProps>()

const currentWidth = ref(initialWidth)
</script>

<template>
  <ElTooltip :content="description">
    <div class="function-item" :style="{ width: currentWidth }">
      <slot />
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
