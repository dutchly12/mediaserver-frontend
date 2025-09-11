<script setup lang="ts">
import { ref, computed, watch, useTemplateRef } from 'vue';

import { AspectRatio } from '@/components/ui/aspect-ratio';
import type { Video } from '@/types/model/video.ts';

const props = defineProps<{
  video?: Video;
}>();

const emit = defineEmits<{
  progress: [value: number];
}>();

let interval: number | null = null;

const started = ref(false);
const videoPlayer = useTemplateRef<HTMLVideoElement>('video');

const showProgressBar = computed(() => !started.value && !!props.video?.progress);
const progressWidth = computed(() => {
  if (!props.video?.duration) return 0;

  const percent = (props.video.progress / props.video.duration) * 100;

  return `${percent}%`;
});

const saveProgress = async () => {
  if (!videoPlayer.value) return;

  emit('progress', videoPlayer.value.currentTime);
};

const startInterval = () => {
  if (interval !== null) return;
  if (!started.value) started.value = true;

  interval = setInterval(saveProgress, 5000);
};

const stopInterval = () => {
  if (interval === null) return;

  clearInterval(interval);
  saveProgress();
};

const handlePlayerStart = () => {
  startInterval();
};

const handlePlayerPause = () => {
  stopInterval();
};

const handleVideoUpdate = (video?: Video) => {
  if (!video || !videoPlayer.value || interval) return;

  videoPlayer.value.currentTime = video.progress;
};

watch(() => props.video, handleVideoUpdate);
</script>

<template>
  <AspectRatio :ratio="16 / 9">
    <video
      ref="video"
      :src="props.video?.file"
      :poster="props.video?.preview ?? undefined"
      controls
      class="object-cover w-full h-full"
      @play="handlePlayerStart"
      @pause="handlePlayerPause"
    />
    <div v-if="showProgressBar" class="absolute left-0 bottom-0 h-1 w-full">
      <div :style="{ width: progressWidth }" class="h-full bg-teal-200"></div>
    </div>
  </AspectRatio>
</template>
