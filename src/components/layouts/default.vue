<script setup lang="ts">
import AppMenu from '@/components/app/menu.vue';
</script>

<template>
  <div>
    <AppMenu />

    <div class="mt-14.5 mx-2 lg:ml-72 lg:my-4">
      <slot />
    </div>
  </div>
</template>
