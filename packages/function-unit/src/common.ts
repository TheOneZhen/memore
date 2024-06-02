import type { InjectionKey, Ref } from 'vue'

export const ContainerSizeKey = Symbol('container-size-key') as InjectionKey<
  Ref<number>
>
