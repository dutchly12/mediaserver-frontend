<script setup lang="ts">
import { Button, type ButtonVariants } from '@/components/ui/button';
import type { HTMLAttributes } from 'vue';
import type { PrimitiveProps } from 'reka-ui';

interface Props extends PrimitiveProps {
  variant?: ButtonVariants['variant'];
  size?: ButtonVariants['size'];
  class?: HTMLAttributes['class'];
}

const props = defineProps<Props>();
</script>

<template>
  <Button v-bind="props">
    <slot />
  </Button>
</template>
