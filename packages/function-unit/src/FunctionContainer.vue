<script lang="ts" setup>
import FunctionItem from './FunctionItem.vue'
import type { FunctionContainerProps } from '../typings'
/**
 * 样式效果预览
 * 用户可以通过手势、外设控制内容缩放程度（目前仅支持当前组件，之后蔓延到其他组件）
 */
const { data, initialWidth } = defineProps<FunctionContainerProps>()
</script>

<template>
  <div class="function-container">
    <FunctionItem
      v-for="(item, index) in data"
      :key="index"
      :initial-width="initialWidth"
    >
      <slot :item="item" />
    </FunctionItem>
  </div>
</template>

<style lang="scss">
.function-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  justify-items: stretch;
  align-items: center;
  align-content: space-between;
}
</style>
