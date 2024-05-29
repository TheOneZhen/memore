<script lang="ts" setup>
import { defineProps, ref } from 'vue'
import { ElTooltip } from 'element-plus'
import { useElementSize, watchDebounced } from '@vueuse/core'
import type { FunctionItemProps } from '../typings'
/**
 * 样式效果预览
 * 通过控制currentWidth来控制组件的宽度，然后借助外部container的布局来达到交互效果
 */
const { description, initialWidth = 0 } = defineProps<FunctionItemProps>()
const currentWidth = ref(initialWidth)
const fixableParent = ref<HTMLDivElement>()
const { width: parentWidth } = useElementSize(fixableParent)
/**
 * 计算parent宽度和children最小宽度之和
 *  1. 如果前`i`个child最小宽度之和 <= parent宽度
 *    1. parent使用flex布局
 *  2. 否则第`i`个child的`display: none;`
 */

watchDebounced(parentWidth, (newParentWidth) => {
  const parent = fixableParent.value

  if (!parent) return

  const children = Array.from(parent.children)

  if (children.length === 0) return
  let childrenWidthSum = 0
  let noneSwitch = false
  for (const child of children) {
    const style = (child as HTMLElement).style
    const childWidth =
      Number.parseInt(
        style.getPropertyValue('min-width') || style.getPropertyValue('width'),
      ) || 0
    if (!childWidth) continue
    childrenWidthSum += childWidth
    if (childrenWidthSum > newParentWidth) noneSwitch = true
    else noneSwitch = false
    if (noneSwitch === true) style.position = 'absolute'
    else style.display = 'relative'
  }
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
