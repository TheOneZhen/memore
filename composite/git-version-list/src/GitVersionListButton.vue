<script lang="ts" setup>
import { FunctionItem } from 'function-unit'
import { ElIcon, ElTooltip } from 'element-plus'
import { prefix } from './common'
</script>

<template>
  <ElTooltip :content="prefix">
    <FunctionItem>
      <ElIcon icon-line-md:github />
      <span>{{ prefix }}</span>
    </FunctionItem>
  </ElTooltip>
</template>
