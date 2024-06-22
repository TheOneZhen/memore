<script lang="ts" setup>
import { FunctionItem } from 'function-unit'
import { ElIcon } from 'element-plus'
import { prefix } from './common'
</script>

<template>
  <FunctionItem>
    <ElIcon icon-line-md:menu />
    <span>{{ prefix }}</span>
  </FunctionItem>
</template>
