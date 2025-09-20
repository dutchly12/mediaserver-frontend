<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useHead } from '@unhead/vue';
import { useLayout } from '@/composables/use-layout';
import VideoList from '@/components/video/list.vue';

const { t } = useI18n();

useLayout(() => ({
  title: t('pages.index.title'),
}));

useHead(() => ({
  title: t('pages.index.meta.title'),
}));
</script>

<template>
  <VideoList />
</template>
