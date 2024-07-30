<script lang="ts" setup>
import { type Component, computed, ref } from 'vue'

const props = defineProps<{
  scale: number
  children: Component[][]
  mini: Component[][]
  duration: number
}>()
const isMini = ref(true)

function handleClick() {
  isMini.value = !isMini.value
}
</script>

<template>
  <div class="container" @click="handleClick">
    <div v-for="(row, rowIndex) in children" :key="rowIndex" class="rows">
      <div v-for="(col, colIndex) in row" :key="colIndex" class="cols">
        <component
          :is="col"
          class="common"
          :class="isMini ? 'mini' : 'normal'"
          :style="{ 'transition-duration': duration + 'ms' }"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  .rows {
    display: flex;
    .cols {
    }
  }

  .common {
    transition: transform;
  }

  .mini {
    transform: scale(v-bind(scale));
  }

  .normal {
    transform: scale(1);
  }
}
</style>
