<script lang="ts" setup>
import { FunctionItem } from 'function-unit'
import { ElIcon } from 'element-plus'

const title = 'note list'
</script>

<template>
  <function-item :description="title">
    <el-icon icon-line-md:menu />
    <span>{{ title }}</span>
  </function-item>
</template>
