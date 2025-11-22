<script setup lang="ts">
import { computed } from 'vue';
import { ImageOff } from 'lucide-vue-next';
import { numberToTime } from '@/lib/formatters';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { UiText } from '@/components/ui';
import type { ListVideo } from '@/types/model/video';

const props = defineProps<{ video: ListVideo }>();

const progressPercent = computed(() => {
  if (!props.video.progress || !props.video.duration) return 0;

  return (props.video.progress / props.video.duration) * 100;
});
const showProgressBar = computed(() => props.video.progress && !props.video.viewed);

const formatterDuration = computed(
  () => props.video.duration && numberToTime(props.video.duration),
);
</script>

<template>
  <RouterLink
    :to="{ name: 'videos-id', params: { id: props.video.id } }"
    class="flex flex-col gap-1"
  >
    <AspectRatio
      :ratio="16 / 9"
      :class="{
        'bg-black': true,
        'opacity-10 transition-opacity hover:opacity-100': props.video.viewed,
      }"
    >
      <img
        v-if="props.video.preview"
        :src="props.video.preview"
        :alt="props.video.name"
        loading="lazy"
        class="object-cover w-full h-full"
      />

      <div v-else class="object-cover w-full h-full flex justify-center items-center">
        <ImageOff class="h-[30%] w-fit aspect-square text-white" />
      </div>

      <UiText
        v-if="formatterDuration"
        variant="small"
        class="absolute right-0 bottom-0 p-1 bg-black text-white z-1"
      >
        {{ formatterDuration }}
      </UiText>

      <div v-if="showProgressBar" class="absolute left-0 bottom-0 h-1 w-full z-2">
        <div :style="{ width: `${progressPercent}%` }" class="h-full bg-teal-200"></div>
      </div>
    </AspectRatio>

    <UiText :title="video.name" variant="muted" class="truncate">{{ video.name }}</UiText>
  </RouterLink>
</template>
