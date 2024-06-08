import { h } from 'vue'
import { ElDialog } from 'element-plus'
import type { Component } from 'vue'

let container: null | Component = null

function main(comp: Component) {
  if (container === null) {
    container = h(ElDialog, {})
  }
}
