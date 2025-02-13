<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { useHead } from '@unhead/vue';
import { useApi } from '@/composables/use-api.ts';
import UiText from '@/components/ui/text.vue';
import type { Collection } from '@/types/model/collection.ts';

const route = useRoute();
const api = useApi();

const loading = ref(false);
const collection = ref<Collection>();

const loadCollection = async () => {
  if (loading.value || typeof route.params.id !== 'string') return;

  loading.value = true;
  try {
    const { data } = await api.collections.one(route.params.id);
    collection.value = data;
  } catch {}
  loading.value = false;
}

loadCollection();

useHead(() => ({
  title: collection.value?.name
}))
</script>

<template>
  <div>
    <UiText variant="h2">
      {{ collection?.name }}
    </UiText>

    <div>
      <RouterLink v-for="video in collection?.videos" :key="video.id" :to="{ name: 'videos-id', params: { id: video.id} }">
        <img :src="video.preview" :alt="video.name" loading="lazy" />
        <UiText>{{ video.name }}</UiText>
      </RouterLink>
    </div>
  </div>
</template>
