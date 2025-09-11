<script setup lang="ts">
import { computed, ref, useTemplateRef, watch } from 'vue';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import type { Video } from '@/types/model/video';

const props = defineProps<{
  video?: Video;
}>();

const emit = defineEmits<{
  progress: [value: number];
}>();

let interval: number | null = null;

const started = ref(false);
const videoPlayer = useTemplateRef<HTMLVideoElement>('video');

const progressPercent = computed(() => {
  if (!props.video?.duration) return 0;

  return (props.video.progress / props.video.duration) * 100;
});
const showProgressBar = computed(() => !started.value && !props.video?.viewed);

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
      <div :style="{ width: `${progressPercent}%` }" class="h-full bg-teal-200"></div>
    </div>
  </AspectRatio>
</template>
