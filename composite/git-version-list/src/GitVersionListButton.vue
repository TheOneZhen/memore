<script lang="ts" setup>
import { FunctionItem } from 'function-unit'
import { ElIcon, ElTooltip } from 'element-plus'
import { prefix } from './common'
</script>

<template>
  <FunctionItem>
    <ElTooltip :content="prefix">
      <ElIcon icon-line-md:github />
      <span>{{ prefix }}</span>
    </ElTooltip>
  </FunctionItem>
</template>
