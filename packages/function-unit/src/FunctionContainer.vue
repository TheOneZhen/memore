<script lang="ts" setup>
import FunctionItem from './FunctionItem.vue'
import type { FunctionContainerProps } from '../typings'

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
