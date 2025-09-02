<script setup lang="ts">
import { AspectRatio } from '@/components/ui/aspect-ratio';
import type { Video } from '@/types/model/video.ts';

const props = defineProps<{
  video?: Video;
}>();
</script>

<template>
  <AspectRatio :ratio="16 / 9">
    <video
      :src="props.video?.file"
      :poster="props.video?.preview ?? undefined"
      controls
      class="object-cover w-full h-full"
    />
  </AspectRatio>
</template>
