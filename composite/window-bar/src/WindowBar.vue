<script lang="ts" setup>
import { FunctionItem } from 'function-unit'
</script>

<template>
  <div class="window-bar">
    <function-item>
      <div style="min-width: 100px">this is test pahse!</div>
      <div style="min-width: 100px">this is test pahse!asdasdasdasdasd</div>
    </function-item>
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
