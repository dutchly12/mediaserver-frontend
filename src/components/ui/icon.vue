<script setup lang="ts">
import { computed } from 'vue';
import main from '@/assets/sprites/main.svg?url';
import type { IconName } from '@/types/assets/icons.ts';

const props = defineProps<{
  name: IconName;
}>()

const href = computed(() => `${main}#${props.name}`)
</script>

<template>
  <svg>
    <use :xlink:href="href" />
  </svg>
</template>
