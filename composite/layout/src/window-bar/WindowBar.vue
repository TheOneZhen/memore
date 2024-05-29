<script lang="ts" setup></script>

<template>
  <div class="window-bar" />
</template>

<style lang="scss">
.window-bar {
  // https://www.electronjs.org/docs/latest/tutorial/window-customization#set-custom-draggable-region
  -webkit-app-region: drag;
  width: 100w;
  height: 60px;
}
</style>
