<script setup lang="ts">
import { ref, watch, useTemplateRef } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useApi } from '@/composables/use-api';
import { usePagination } from '@/composables/use-pagination';
import VideoPreview from '@/components/video/preview.vue';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationFirst,
  PaginationItem,
  PaginationLast,
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
  topEdge.value?.scrollIntoView({ behavior: 'smooth' });
  router.push({ ...route, query: { ...route.query, page } });
}

watch(() => props.params, loadVideos, { immediate: true, deep: true });
</script>

<template>
  <div class="flex flex-col gap-4">
    <div ref="top"></div>

    <div class="grid grid-cols-1 gap-2 md:grid-cols-3 lg:grid-cols-4">
      <VideoPreview v-for="video in videos" :key="video.id" :video />
    </div>

    <Pagination
      v-if="videos?.length"
      :page="meta.page"
      :items-per-page="meta.limit"
      :total="meta.count"
      show-edges
      v-slot="{ page }"
      @update:page="setPage"
    >
      <PaginationContent v-slot="{ items }">
        <PaginationFirst />

        <template v-for="(item, index) in items" :key="index">
          <PaginationItem
            v-if="item.type === 'page'"
            :value="item.value"
            :is-active="item.value === page"
          >
            {{ item.value }}
          </PaginationItem>

          <PaginationEllipsis v-else />
        </template>

        <PaginationLast />
      </PaginationContent>
    </Pagination>
  </div>
</template>
