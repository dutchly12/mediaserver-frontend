<script setup lang="ts">
const props = withDefaults(defineProps<{ type?: 'button' | 'submit' }>(), { type: 'button' });
</script>

<template>
  <button :type="props.type">
    <slot />
  </button>
</template>
