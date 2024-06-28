<script lang="ts" setup>
import { ElDrawer, ElTabPane, ElTabs } from 'element-plus'
import { UseSiderbarStore } from './state'

const useSiderbarStore = UseSiderbarStore()
</script>

<template>
  <ElDrawer v-model="useSiderbarStore.isShow" append-to-body direction="ltr">
    <ElTabs>
      <ElTabPane
        v-for="content in useSiderbarStore.contents"
        :key="content.name"
        :label="content.name"
      >
        <component :is="content" />
      </ElTabPane>
    </ElTabs>
  </ElDrawer>
</template>

<style lang="scss"></style>
