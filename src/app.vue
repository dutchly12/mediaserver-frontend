<script setup lang="ts">
import { useHead } from '@unhead/vue';
import { useI18n } from 'vue-i18n';
import { useColorMode } from '@vueuse/core';
import { Toaster } from '@/components/ui/sonner';
import LayoutsController from '@/components/layouts/controller.vue';

const { locale, t } = useI18n();
const mode = useColorMode();

mode.value = 'auto';

useHead(() => ({
  htmlAttrs: {
    lang: locale,
    dir: 'ltr',
  },
  titleTemplate: t('meta.title_template'),
}));
</script>

<template>
  <Toaster
    :offset="{ top: '5rem', right: '1rem' }"
    :theme="mode === 'light' ? 'light' : 'dark'"
    position="top-right"
  />

  <LayoutsController>
    <RouterView />
  </LayoutsController>
</template>
