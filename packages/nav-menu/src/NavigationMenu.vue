<script lang="ts" setup>
import { type Component, ref } from 'vue'
// 数据校验的事情应该由调用者来完成
defineProps<{
  scale: number
  children: Component[][]
  mini: Component[][]
  duration: number
}>()
const isCollapse = ref(false)

function handleClick() {
  isCollapse.value = !isCollapse.value
}
</script>

<template>
  <div class="container" @click="handleClick">
    <div v-for="(row, rowIndex) in children" :key="rowIndex">
      <div v-for="(col, colIndex) in row" :key="colIndex">
        <template v-if="isCollapse">
          <component :is="mini[rowIndex][colIndex]" class="mini common" />
        </template>
        <template v-else>
          <component :is="col" class="normal common" />
        </template>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.container {
  display: flex;
  align-items: center;
  justify-content: center;

  .common {
    transition-duration: v-bind(duration);
  }

  .mini {
    transform: scale(v-bind(scale));
  }

  .normal {
    transform: scale(calc(1 / v-bind(scale)));
  }
}
</style>
