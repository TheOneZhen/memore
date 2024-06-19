<script lang="ts" setup>
import { ref } from 'vue'
import { ElDialog, ElIcon } from 'element-plus'
import WindowBar from './window-bar/WindowBar.vue'

const isDialogShow = ref(false)
</script>

<template>
  <WindowBar />
  <ElDialog
    v-model="isDialogShow"
    :modal="false"
    append-to-body
    :lock-scroll="false"
    show-close
    draggable
  >
    <component :is="dialogContent" />
  </ElDialog>
</template>

<style lang="scss"></style>
