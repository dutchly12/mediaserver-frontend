<script setup lang="ts">
import type { Video } from '@/types/model/video.ts';

const props = defineProps<{
  video?: Video;
}>();
</script>

<template>
  <video
    :src="props.video?.file"
    :poster="props.video?.preview ?? undefined"
    controls
    class="w-full aspect-video"
  />
</template>
