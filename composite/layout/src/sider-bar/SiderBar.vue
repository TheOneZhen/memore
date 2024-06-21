<script lang="ts" setup>
import { ElDialog, ElTabPane, ElTabs } from 'element-plus'
import { UseSiderbarStore } from './state'

const useSiderbarStore = UseSiderbarStore()
</script>

<template>
  <ElDialog
    v-model="useSiderbarStore.isShow"
    :modal="false"
    append-to-body
    :lock-scroll="false"
    show-close
    draggable
  >
    <ElTabs>
      <ElTabPane
        v-for="content in useSiderbarStore.contents"
        :key="content.name"
        :label="content.name"
      >
        <component :is="content" />
      </ElTabPane>
    </ElTabs>
  </ElDialog>
</template>

<style lang="scss"></style>
