import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Component } from 'vue'

export const UseSiderbarStore = defineStore('siderbar', () => {
  const isShow = ref(false)
  const contents = ref<Set<Component>>(new Set())

  function add(content: Component) {
    contents.value.add(content)
    open()
  }

  function clear() {
    contents.value.clear()
  }

  function open() {
    isShow.value = true
  }

  function close() {
    isShow.value = false
  }

  return { contents, isShow, add, clear, open, close }
})
