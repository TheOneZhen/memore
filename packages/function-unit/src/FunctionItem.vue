<script lang="ts" setup>
import { inject, onMounted, ref } from 'vue'
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
const children = new Array<Element>()

!isConstant &&
  watchDebounced(size, resetChildren, {
    debounce: 500,
    maxWait: 1000,
  })

function resetChildren(newSize: number, oldSize: number) {
  newSize = Math.max(min, Math.min(newSize, max))
  if (newSize === oldSize) return
  if (newSize > oldSize) {
    while (oldSize < newSize) {
      const node = children[oldSize++]
      node && parentRef.value?.appendChild(node)
    }
  } else {
    while (newSize < oldSize) {
      const node = children[newSize++]
      node && parentRef.value?.removeChild(node)
    }
  }
}

onMounted(() => {
  const parentDOM = parentRef.value

  if (!parentDOM) return

  const childrenDOM = Array.from(parentDOM.children)

  if (childrenDOM.length === 0) return

  children.push(...childrenDOM)

  resetChildren(size.value, children.length)
})
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
