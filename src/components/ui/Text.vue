<script setup lang="ts">
import { computed } from 'vue';

type TextVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'lead' | 'large' | 'small' | 'muted' | 'body';

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
  () => props.tag ?? (/^h[1-4]$/.test(props.variant) ? props.variant : 'div'),
);

const font = computed(() => {
  const headingClasses = `scroll-m-20 tracking-tight`;

  switch (props.variant) {
    case 'h1':
      return `text-4xl font-extrabold lg:text-5xl ${headingClasses}`;
    case 'h2':
      return `text-3xl font-semibold ${headingClasses}`;
    case 'h3':
      return `text-2xl font-semibold ${headingClasses}`;
    case 'h4':
      return `text-xl font-semibold ${headingClasses}`;
    case 'lead':
      return 'text-xl text-muted-foreground';
    case 'large':
      return 'text-lg font-semibold';
    case 'small':
      return 'text-sm font-medium leading-none';
    case 'muted':
      return 'text-sm text-muted-foreground';
    default:
      return 'leading-7';
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
