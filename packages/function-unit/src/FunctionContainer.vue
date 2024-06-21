<script lang="ts" setup>
import { provide, readonly, ref } from 'vue'
import { ContainerSizeKey } from './common'
import type { FunctionContainerProps } from '../'

const { initialSize = 1 } = defineProps<FunctionContainerProps>()

const size = ref(initialSize)

provide(ContainerSizeKey, readonly(size))
/**
 * 用户可以通过外设操作，改变size值。
 * 需要对不同平台优化
 */

function handleAdd() {
  console.log(size.value++)
}
</script>

<template>
  <div class="function-container">
    <button @click="handleAdd">addSize</button>
    <slot />
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
