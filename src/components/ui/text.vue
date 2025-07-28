<script setup lang="ts">
import { computed } from 'vue';

type TextVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'lead' | 'body';

const props = withDefaults(
  defineProps<{
    variant?: TextVariant;
    tag?: string;
    align?: 'start' | 'center' | 'end';
  }>(),
  {
    variant: 'body',
    align: 'start',
  },
);

const component = computed(
  () => props.tag ?? (/^h[1-6]$/.test(props.variant) ? props.variant : 'div'),
);

const font = computed(() => {
  const headingClasses = `leading-[1.2] font-medium`;

  switch (props.variant) {
    case 'h1':
      return `text-5xl ${headingClasses}`;
    case 'h2':
      return `text-4xl ${headingClasses}`;
    case 'h3':
      return `text-3xl ${headingClasses}`;
    case 'h4':
      return `text-2xl ${headingClasses}`;
    case 'h5':
      return `text-base ${headingClasses}`;
    case 'h6':
      return `text-5xl ${headingClasses}`;
    case 'lead':
      return 'text-2xl leading-[1.5] font-light';
    default:
      return 'text-base font-medium';
  }
});

const align = computed(() => {
  switch (props.align) {
    case 'center':
      return 'text-center';
    case 'end':
      return 'text-end';
    default:
      return 'text-start';
  }
});

const classes = computed(() => ['m-0', font.value, align.value]);
</script>

<template>
  <component :is="component" :class="classes">
    <slot />
  </component>
</template>
