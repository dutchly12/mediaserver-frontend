<script setup lang="ts">
import { computed, defineAsyncComponent } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const component = computed(() => {
  switch (route.meta.layout) {
    case 'authentication':
      return defineAsyncComponent(() => import('@/components/layouts/authentication.vue'));
    default:
      return defineAsyncComponent(() => import('@/components/layouts/default.vue'));
  }
});
</script>

<template>
  <Suspense>
    <component :is="component">
      <slot />
    </component>
  </Suspense>
</template>
