<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { useHead } from '@unhead/vue';
import { useApi } from '@/composables/use-api.ts';
import UiText from '@/components/ui/text.vue';
import type { Video } from '@/types/model/video.ts';

const route = useRoute();
const api = useApi();

const loading = ref(false);
const video = ref<Video>();

const loadVideo = async () => {
  if (loading.value || typeof route.params.id !== 'string') return;

  loading.value = true;
  try {
    const { data } = await api.videos.one(route.params.id);
    video.value = data;
  } catch {}
  loading.value = false;
};

loadVideo();

useHead(() => ({
  title: video.value?.name,
}));
</script>

<template>
  <div>
    <UiText variant="h3">{{ video?.name }}</UiText>

    <video :src="video?.file" :poster="video?.preview" controls />
  </div>
</template>
