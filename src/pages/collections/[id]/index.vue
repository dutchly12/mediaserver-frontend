<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useHead } from '@unhead/vue';
import { useApi } from '@/composables/use-api.ts';
import UiText from '@/components/ui/text.vue';
import PageCollectionIdUploader from '@/components/page/collections/id/uploader.vue';
import VideoPreview from '@/components/video/preview.vue';
import type { Collection } from '@/types/model/collection.ts';
import type { ListVideo } from '@/types/model/video.ts';

const route = useRoute();
const api = useApi();

const loading = ref(false);
const collection = ref<Collection>();
const videos = ref<ListVideo[]>([]);

const routeId = computed(() => route.params.id as string);

const loadCollection = async () => {
  const { data } = await api.collections.one(routeId.value);
  collection.value = data;
};

const loadVideos = async () => {
  const { data } = await api.videos.list({ collection_id: routeId.value });
  videos.value = data;
};

const loadData = async () => {
  if (loading.value) return;

  loading.value = true;
  try {
    await Promise.all([loadCollection(), loadVideos()]);
  } catch {}
  loading.value = false;
};

loadData();

watch(routeId, loadData);

useHead(() => ({
  title: collection.value?.name,
}));
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="p-2 flex justify-between items-center border-b">
      <UiText variant="h2">
        {{ collection?.name }}
      </UiText>

      <PageCollectionIdUploader :collection-id="routeId" />
    </div>

    <div class="grid grid-cols-1 gap-2" md="grid-cols-3" lg="grid-cols-4">
      <VideoPreview v-for="video in videos" :key="video.id" :video />
    </div>
  </div>
</template>
