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
        ? 'border-blue-400 bg-blue-400 text-white hover:border-blue-500 hover:bg-blue-500 active:border-blue-600 active:border-blue-600'
        : 'border-blue-400 text-blue-400 hover:border-blue-500 hover:text-white hover:bg-blue-500 active:border-blue-600 active:border-blue-600 active:bg-blue-600';
    case 'red':
      return isDefault
        ? 'border-red-400 bg-red-400 text-white hover:border-red-500 hover:bg-red-500 active:border-red-600 active:border-red-600'
        : 'border-red-400 text-red-400 hover:border-red-500 hover:text-white hover:bg-red-500 active:border-red-600 active:border-red-600 active:bg-red-600';
    default:
      return isDefault
        ? 'border-gray-400 bg-gray-400 text-white hover:border-gray-500 hover:bg-gray-500 active:border-gray-600 active:border-gray-600'
        : 'border-gray-400 text-gray-400 hover:border-gray-500 hover:text-white hover:bg-gray-500 active:border-gray-600 active:border-gray-600 active:bg-gray-600';
  }
});

const classes = computed(() => {
  const defaultClasses = `${props.compact ? 'px-2' : 'px-4'} py-2 border-1 rounded-lg transition-colors text-center cursor-pointer`;

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
