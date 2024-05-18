<script lang="ts" setup>
import { FunctionContainerProps } from '../types'
import FunctionItem from './FunctionItem.vue'

const { data, initialWidth } = defineProps<FunctionContainerProps>()
</script>

<template>
  <div class="function-container">
    <FunctionItem
      :initial-width="initialWidth"
      v-for="(item, index) in data"
      :key="index"
    >
      <slot :item="item"></slot>
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
