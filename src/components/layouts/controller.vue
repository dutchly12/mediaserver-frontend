<script setup lang="ts">
import { computed, defineAsyncComponent } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const AuthenticationLayout = defineAsyncComponent(() => import('@/components/layouts/authentication.vue'));
const DefaultLayout = defineAsyncComponent(() => import('@/components/layouts/default.vue'))

const component = computed(() => {
  switch (route.meta.layout) {
    case 'authentication':
      return AuthenticationLayout;
    default:
      return DefaultLayout;
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
