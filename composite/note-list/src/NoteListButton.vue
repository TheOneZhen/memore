<script lang="ts" setup>
import { FunctionItem } from 'function-unit'
import { ElIcon } from 'element-plus'
import { prefix } from './common'
</script>

<template>
  <function-item :description="prefix">
    <el-icon icon-line-md:menu />
    <span>{{ prefix }}</span>
  </function-item>
</template>
