<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useApi } from '@/composables/use-api';

const router = useRouter();
const api = useApi();

const loadRandomVideoId = async () => {
  try {
    const { data } = await api.videos.random();
    await router.replace({ name: 'videos-id', params: { id: data.id } });
  } catch {}
};

loadRandomVideoId();
</script>

<template>
  <div></div>
</template>
