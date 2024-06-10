<script lang="ts" setup>
import { FunctionContainer, FunctionItem } from 'function-unit'
import type { GitVersionListProps } from '../'

const { data, selectGitVersion } = defineProps<GitVersionListProps>()
</script>

<template>
  <FunctionContainer>
    <FunctionItem
      v-for="item in data"
      :key="item.id"
      v-bind="item"
      @click="selectGitVersion(item.id)"
    />
  </FunctionContainer>
</template>

<style lang="scss"></style>
