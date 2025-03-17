<script setup lang="ts">
import { computed } from 'vue';
import UiText from '@/components/ui/text.vue';
import type { ListVideo } from '@/types/model/video.ts';
import { numberToTime } from '@/utils/formatters.ts';

const props = defineProps<{ video: ListVideo }>();

const formatterDuration = computed(
  () => props.video.duration && numberToTime(props.video.duration),
);
</script>

<template>
  <RouterLink
    :to="{ name: 'videos-id', params: { id: props.video.id } }"
    class="flex flex-col gap-2"
  >
    <div
      class="relative w-full max-w-full flex justify-center align-middle aspect-ratio-video overflow-hidden bg-black"
    >
      <img
        v-if="props.video.preview"
        :src="props.video.preview"
        :alt="props.video.name"
        loading="lazy"
      />

      <div v-if="formatterDuration" class="absolute right-0 bottom-0 px-1 bg-black text-white">
        {{ formatterDuration }}
      </div>
    </div>

    <UiText :title="video.name" class="truncate">{{ video.name }}</UiText>
  </RouterLink>
</template>
