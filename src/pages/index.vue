<script setup lang="ts">
import { useHead } from '@unhead/vue';
import { useI18n } from 'vue-i18n';
import VideoList from '@/components/video/list.vue';

const { t } = useI18n();

useHead(() => ({
  title: t('pages.index.meta.title'),
}));
</script>

<template>
  <VideoList />
</template>
