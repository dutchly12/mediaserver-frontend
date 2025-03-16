<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink, type RouterLinkProps } from 'vue-router';

const props = withDefaults(
  defineProps<{
    variant?: 'default' | 'outlined';
    color?: 'gray' | 'blue' | 'red';
    compact?: boolean;
    to?: RouterLinkProps['to'];
    type?: 'button' | 'submit';
    disabled?: boolean;
  }>(),
  {
    variant: 'default',
    color: 'gray',
    compact: false,
    type: 'button',
    disabled: false,
  },
);

const component = computed(() => (props.to ? RouterLink : 'button'));

const variationClasses = computed(() => {
  const isDefault = props.variant === 'default';

  switch (props.color) {
    case 'blue':
      return isDefault
        ? 'border-blue-4 bg-blue-4 text-white hover:border-blue-5 hover:bg-blue-5 active:border-blue-6 active:border-blue-6'
        : 'border-blue-4 text-blue-4 hover:border-blue-5 hover:text-white hover:bg-blue-5 active:border-blue-6 active:border-blue-6 active:bg-blue-6';
    case 'red':
      return isDefault
        ? 'border-red-4 bg-red-4 text-white hover:border-red-5 hover:bg-red-5 active:border-red-6 active:border-red-6'
        : 'border-red-4 text-red-4 hover:border-red-5 hover:text-white hover:bg-red-5 active:border-red-6 active:border-red-6 active:bg-red-6';
    default:
      return isDefault
        ? 'border-gray-4 bg-gray-4 text-white hover:border-gray-5 hover:bg-gray-5 active:border-gray-6 active:border-gray-6'
        : 'border-gray-4 text-gray-4 hover:border-gray-5 hover:text-white hover:bg-gray-5 active:border-gray-6 active:border-gray-6 active:bg-gray-6';
  }
});

const classes = computed(() => {
  const defaultClasses = `${props.compact ? 'px-2' : 'px-4'} py-2 border-1 rounded-2 transition-colors text-center`;

  return [defaultClasses, variationClasses.value];
});
</script>

<template>
  <component
    :is="component"
    :to="props.to"
    :type="props.type"
    :disabled="props.disabled"
    :class="classes"
  >
    <slot />
  </component>
</template>
