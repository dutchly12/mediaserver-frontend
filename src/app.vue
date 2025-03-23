<script setup lang="ts">
import { useHead } from '@unhead/vue';
import { useI18n } from 'vue-i18n';
import LayoutsController from '@/components/layouts/controller.vue';

const { locale, t } = useI18n();

useHead(() => ({
  htmlAttrs: {
    lang: locale,
    dir: 'ltr',
  },
  bodyAttrs: {
    class: 'color-black bg-white font-serif dark:color-white dark:bg-black',
  },
  titleTemplate: t('meta.title_template'),
}));
</script>

<template>
  <LayoutsController>
    <RouterView />
  </LayoutsController>
</template>
