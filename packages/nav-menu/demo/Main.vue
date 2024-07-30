<script lang="ts" setup>
import { h, shallowRef } from 'vue'
import { NavigationMenu } from '../'

const children = shallowRef(
  Array.from({ length: 3 }, () =>
    Array.from({ length: 3 }, () => h('div', { class: 'child' })),
  ),
)

const mini = shallowRef(
  Array.from({ length: 3 }, () =>
    Array.from({ length: 3 }, () => h('div', { class: 'thumb' })),
  ),
)
</script>

<template>
  <NavigationMenu
    :scale="0.25"
    :children="children"
    :mini="mini"
    :duration="1000"
    class="main"
  />
</template>

<style lang="scss">
.main {
  position: fixed;
  bottom: 10%;
  right: 10%;
  .child {
    width: 160px;
    height: 160px;
    background-color: gray;
  }
  .thumb {
    width: 40px;
    height: 40px;
    background-color: gray;
  }
  * {
    margin: 10px;
  }
}
</style>
