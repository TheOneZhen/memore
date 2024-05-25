<script lang="ts" setup>
import FunctionUnit from 'function-unit'
const { FunctionItem } = FunctionUnit
</script>

<template>
  <div class="window-bar">
    <function-item>this is test pahse!</function-item>
  </div>
</template>

<style lang="scss">
.window-bar {
  // https://www.electronjs.org/docs/latest/tutorial/window-customization#set-custom-draggable-region
  -webkit-app-region: drag;
  width: 100w;
  height: 60px;
}
</style>
