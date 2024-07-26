<script lang="ts" setup>
import { h, shallowRef } from 'vue'
import { NavigationMenu } from '../'

const children = shallowRef(
  Array.from({ length: 3 }, () =>
    Array.from({ length: 3 }, () => h('span', '😀')),
  ),
)

const mini = shallowRef(
  Array.from({ length: 3 }, () =>
    Array.from({ length: 3 }, () => h('span', '.')),
  ),
)
</script>

<template>
  <NavigationMenu
    :scale="4"
    :children="children"
    :mini="mini"
    :duration="0.5"
  />
</template>

<style lang="scss" />
