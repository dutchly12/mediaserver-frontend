<script setup lang="ts">
import { ref, watch, useTemplateRef } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';
import { useApi } from '@/composables/use-api';
import { usePagination } from '@/composables/use-pagination';
import VideoPreview from '@/components/video/preview.vue';
import {
  Pagination,
  PaginationContent,
  PaginationFirst,
  PaginationItem,
  PaginationLast,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import type { ListVideo } from '@/types/model/video';

const props = defineProps<{
  params?: {
    person_ids?: string[];
    tag_ids?: string[];
  };
}>();

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();
const api = useApi();
const { meta, setMeta } = usePagination(loadVideos);

const topEdge = useTemplateRef('top');
const loading = ref(false);
const videos = ref<ListVideo[]>();

async function loadVideos() {
  if (loading.value) return;

  loading.value = true;
  try {
    const {
      data: { items, meta: receiverMeta },
    } = await api.videos.list({
      unviewed: userStore.onlyUnviewedVideos ?? false,
      person_ids: props.params?.person_ids,
      tag_ids: props.params?.tag_ids,
      limit: meta.value.limit,
      page: meta.value.page,
    });
    videos.value = items;

    setMeta(receiverMeta);
  } catch {}
  loading.value = false;
}

function setPage(page: number) {
  if (page === meta.value.page) return;

  topEdge.value?.scrollIntoView({ behavior: 'smooth' });
  router.push({ ...route, query: { ...route.query, page } });
}

watch(() => [props.params, userStore.onlyUnviewedVideos], loadVideos, {
  immediate: true,
  deep: true,
});
</script>

<template>
  <div class="flex flex-col gap-4">
    <div ref="top"></div>

    <div class="grid grid-cols-1 gap-2 md:grid-cols-3 lg:grid-cols-4">
      <VideoPreview v-for="video in videos" :key="video.id" :video />
    </div>

    <Pagination
      v-if="meta.pages > 1"
      :page="meta.page"
      :items-per-page="meta.limit"
      :total="meta.count"
      v-slot="{ page, pageCount }"
      @update:page="setPage"
    >
      <PaginationContent>
        <PaginationFirst />
        <PaginationPrevious />

        <PaginationItem :value="page" size="lg">
          {{ $t('labels.a_of_b', { a: page, b: pageCount }) }}
        </PaginationItem>

        <PaginationNext />
        <PaginationLast />
      </PaginationContent>
    </Pagination>
  </div>
</template>
