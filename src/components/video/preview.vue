<script setup lang="ts">
import { computed } from 'vue';
import { ImageOff } from 'lucide-vue-next';
import { numberToTime } from '@/lib/formatters.ts';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import Text from '@/components/ui/Text.vue';
import type { ListVideo } from '@/types/model/video.ts';

const props = defineProps<{ video: ListVideo }>();

const progressWidth = computed(() => {
  if (!props.video.progress || !props.video.duration) return 0;

  const percent = (props.video.progress / props.video.duration) * 100;

  return `${percent}%`;
});

const formatterDuration = computed(
  () => props.video.duration && numberToTime(props.video.duration),
);
</script>

<template>
  <RouterLink
    :to="{ name: 'videos-id', params: { id: props.video.id } }"
    class="flex flex-col gap-1"
  >
    <AspectRatio :ratio="16 / 9" class="bg-black">
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

      <Text
        v-if="formatterDuration"
        variant="small"
        class="absolute right-0 bottom-0 p-1 bg-black text-white z-1"
      >
        {{ formatterDuration }}
      </Text>

      <div v-if="props.video.progress" class="absolute left-0 bottom-0 h-1 w-full z-2">
        <div :style="{ width: progressWidth }" class="h-full bg-teal-200"></div>
      </div>
    </AspectRatio>

    <Text :title="video.name" variant="muted" class="truncate">{{ video.name }}</Text>
  </RouterLink>
</template>
