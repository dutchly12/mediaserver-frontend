<script setup lang="ts">
import { ref } from 'vue';
import { useHead } from '@unhead/vue';
import { useI18n } from 'vue-i18n';
import { useApi } from '@/composables/use-api.ts';
import VideoPreview from '@/components/video/preview.vue';
import type { ListVideo } from '@/types/model/video.ts';

const { t } = useI18n();
const api = useApi();

const loading = ref(false);
const videos = ref<ListVideo[]>([]);

const loadVideos = async () => {
  if (loading.value) return;

  loading.value = true;
  try {
    const { data } = await api.videos.list();
    videos.value = data;
  } catch {}
  loading.value = false;
};

loadVideos();

useHead(() => ({
  title: t('pages.index.meta.title'),
}));
</script>

<template>
  <div class="grid grid-cols-1 gap-2" md="grid-cols-3" lg="grid-cols-4">
    <VideoPreview v-for="video in videos" :key="video.id" :video />
  </div>
</template>
