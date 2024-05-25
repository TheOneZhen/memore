<script lang="ts" setup>
import { defineProps, onMounted, ref } from 'vue'
import { ElTooltip } from 'element-plus'
import type { FunctionItemProps } from '../typings'
/**
 * 样式效果预览
 * 通过控制currentWidth来控制组件的宽度，然后借助外部container的布局来达到交互效果
 */
const { description, initialWidth } = defineProps<FunctionItemProps>()
const fixableParent = ref<HTMLDivElement>()
const currentWidth = ref(initialWidth)
/**
 * 计算parent宽度和children最小宽度之和
 *  1. 如果前`i`个child最小宽度之和 <= parent宽度
 *    1. parent使用flex布局
 *  2. 否则第`i`个child的`display: none;`
 */
function controlChildrenDisplay() {
  const parent = fixableParent.value
  if (!parent) return
  const { children } = parent
  if (children.length === 0) return
  const parentWidth = parent.width
}

onMounted(() => {
  controlChildrenDisplay()
})
</script>

<template>
  <ElTooltip :content="description">
    <div
      ref="fixableParent"
      class="function-item"
      :style="{ width: currentWidth }"
    >
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
  transition: width 1s;
  // https://developer.mozilla.org/en-US/docs/Web/CSS/easing-function
  transition-timing-function: cubic-bezier(0, 1, 0, 2);
  transition-delay: 0.5s;
}
</style>
