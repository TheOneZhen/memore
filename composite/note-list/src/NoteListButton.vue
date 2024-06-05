<script lang="ts" setup>
import { FunctionItem } from 'function-unit'
import { ElIcon, ElTooltip } from 'element-plus'
import { prefix } from './common'
import 'element-plus/es/components/icon/style/css'
import 'element-plus/es/components/tooltip/style/css'
</script>

<template>
  <ElTooltip :content="prefix">
    <function-item>
      <el-icon icon-line-md:menu />
      <span>{{ prefix }}</span>
    </function-item>
  </ElTooltip>
</template>
