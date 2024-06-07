<script lang="ts" setup>
import { FunctionItem } from 'function-unit'
import { ElIcon, ElTooltip } from 'element-plus'
import { prefix } from './common'
</script>

<template>
  <ElTooltip :content="prefix">
    <function-item>
      <el-icon icon-line-md:menu />
      <span>{{ prefix }}</span>
    </function-item>
  </ElTooltip>
</template>
