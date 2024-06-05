<script lang="ts" setup>
import { FunctionContainer, FunctionItem } from 'function-unit'
import type { NoteListProps } from '../'

const { data, openNote } = defineProps<NoteListProps>()
</script>

<template>
  <FunctionContainer>
    <FunctionItem
      v-for="item in data"
      :key="item.id"
      v-bind="item"
      @click="openNote(item.id)"
    />
  </FunctionContainer>
</template>

<style lang="scss"></style>
