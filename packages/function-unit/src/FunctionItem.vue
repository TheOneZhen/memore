<script lang="ts" setup>
import { inject, ref } from 'vue'
import { watchDebounced } from '@vueuse/core'
import { ContainerSizeKey } from './common'
import type { FunctionItemProps } from '../'

const {
  initial = 1,
  max = Number.POSITIVE_INFINITY,
  min = 1,
  isConstant = false,
} = defineProps<FunctionItemProps>()
const parentRef = ref<HTMLDivElement>()
const size = inject(ContainerSizeKey, ref(initial))

isConstant &&
  watchDebounced(
    size,
    (newSize) => {
      newSize = Math.max(min, Math.min(newSize, max))
      const parentDOM = parentRef.value

      if (!parentDOM) return

      const childrenDOM = Array.from(parentDOM.children)

      if (childrenDOM.length === 0) return

      childrenDOM.forEach((dom, index) => {
        Object.assign(
          (dom as HTMLElement).style,
          index >= newSize
            ? {
                flexBasis: '0',
                overflow: 'hidden',
              }
            : {
                flexBasis: 'auto',
              },
        )
      })
    },
    {
      debounce: 500,
      maxWait: 1000,
    },
  )
</script>

<template>
  <div ref="parentRef" class="function-item">
    <slot />
  </div>
</template>

<style lang="scss">
.function-item {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  transition: display 0.5s;
  // https://developer.mozilla.org/en-US/docs/Web/CSS/easing-function
  transition-timing-function: cubic-bezier(0, 1, 0, 2);
  transition-delay: 0.2s;
}
</style>
