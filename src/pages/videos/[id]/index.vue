<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useHead } from '@unhead/vue';
import { useApi } from '@/composables/use-api';
import { formatDate, numberToTime } from '@/lib/formatters';
import VideoPlayer from '@/components/video/player.vue';
import Text from '@/components/ui/Text.vue';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Pencil } from 'lucide-vue-next';
import type { Video } from '@/types/model/video';
import type { Screenshot } from '@/types/model/screenshot';
import { Badge } from '@/components/ui/badge';

const route = useRoute();
const { t } = useI18n();
const api = useApi();

const loading = ref(false);
const progressUpdateLoading = ref(false);
const video = ref<Video>();
const screenshots = ref<Screenshot[]>([]);

const routeId = computed(() => route.params.id as string);
const formatterDuration = computed(
  () => video.value?.duration && numberToTime(video.value.duration),
);

const contentItems = computed(
  () =>
    video.value && [
      {
        title: t('labels.size'),
        value: `${video.value.width}x${video.value.height}`,
      },
      {
        title: t('labels.uploaded'),
        value: formatDate(video.value.created_at),
      },
    ],
);

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

const handleVideoProgress = async (progress: number) => {
  if (!video.value || video.value.viewed || progressUpdateLoading.value) return;

  progressUpdateLoading.value = true;
  try {
    const { data } = await api.videos.update_progress(video.value.id, { progress });
    video.value.progress = data.progress;
  } catch {}
  progressUpdateLoading.value = false;
};

loadVideo();
loadScreenshots();

useHead(() => ({
  title: video.value?.name,
}));
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="grid grid-cols-1 gap-4 lg:grid-cols-[2fr_1fr]">
      <VideoPlayer :video @progress="handleVideoProgress" />

      <Card>
        <CardHeader>
          <CardTitle>
            {{ video?.name }}
          </CardTitle>

          <CardDescription>
            {{ formatterDuration }}
          </CardDescription>

          <CardAction>
            <RouterLink :to="{ name: 'videos-id-edit', params: { id: routeId } }">
              <Button variant="secondary" size="icon">
                <Pencil />
              </Button>
            </RouterLink>
          </CardAction>
        </CardHeader>

        <CardContent class="grid grid-cols-[auto_1fr] items-center gap-2">
          <template v-for="item in contentItems" :key="item.title">
            <Text variant="muted"> {{ item.title }}: </Text>
            <Text variant="small"> {{ item.value }} </Text>
          </template>

          <Text variant="muted"> {{ $t('labels.people') }}: </Text>
          <div v-if="video?.people.length" class="flex flex-wrap gap-2">
            <RouterLink
              v-for="person in video?.people"
              :key="person.id"
              :to="{ name: 'people-id', params: { id: person.id } }"
            >
              <Text variant="small" class="text-blue-500 hover:text-blue-800 transition-colors">
                {{ person.name }}
              </Text>
            </RouterLink>
          </div>
          <Text v-else variant="small"> - </Text>

          <Text variant="muted"> {{ $t('labels.tags') }}: </Text>
          <div v-if="video?.tags.length" class="flex flex-wrap gap-2">
            <Badge v-for="tag in video?.tags" :key="tag.id" variant="outline">
              {{ tag.name }}
            </Badge>
          </div>
          <Text v-else variant="small"> - </Text>
        </CardContent>
      </Card>
    </div>

    <div v-if="screenshots.length" class="grid grid-cols-1 gap-2 md:grid-cols-3 lg:grid-cols-4">
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
