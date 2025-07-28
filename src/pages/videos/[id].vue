<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useHead } from '@unhead/vue';
import { useApi } from '@/composables/use-api.ts';
import UiText from '@/components/ui/text.vue';
import type { Video } from '@/types/model/video.ts';
import type { Screenshot } from '@/types/model/screenshot.ts';

const route = useRoute();
const api = useApi();

const loading = ref(false);
const video = ref<Video>();
const screenshots = ref<Screenshot[]>([]);

const routeId = computed(() => route.params.id as string);

const loadVideo = async () => {
  if (loading.value) return;

  loading.value = true;
  try {
    const { data } = await api.videos.one(routeId.value);
    video.value = data;
  } catch {}
  loading.value = false;
};

const loadScreenshots = async () => {
  try {
    const { data } = await api.videos.screenshots(routeId.value);
    screenshots.value = data;
  } catch {}
};

loadVideo();
loadScreenshots();

useHead(() => ({
  title: video.value?.name,
}));
</script>

<template>
  <div>
    <UiText variant="h3" class="mb-4">{{ video?.name }}</UiText>

    <div class="grid grid-cols-1 gap-4" lg="grid-cols-[2fr_1fr]">
      <video
        :src="video?.file"
        :poster="video?.preview ?? undefined"
        controls
        class="w-full aspect-ratio-video"
      />

      <!--      <div class="p-4 border">-->
      <!--        <div class="grid grid-cols-2">-->
      <!--          <div>test</div>-->
      <!--          <div>123</div>-->
      <!--        </div>-->
      <!--      </div>-->
    </div>

    <div
      v-if="screenshots.length"
      class="mt-2 grid grid-cols-1 gap-2"
      md="grid-cols-3"
      lg="grid-cols-4"
    >
      <div
        v-for="(screenshot, index) in screenshots"
        :key="screenshot.url"
        class="w-full flex justify-center"
      >
        <img :src="screenshot.url" :alt="`screenshot-${index}`" loading="lazy" class="w-full" />
      </div>
    </div>
  </div>
</template>
