<script setup lang="ts">
import AppMenu from '@/components/app/menu.vue';
</script>

<template>
  <div>
    <AppMenu />

    <div class="mt-14.5 md:ml-62 md:mt-2">
      <slot />
    </div>
  </div>
</template>
