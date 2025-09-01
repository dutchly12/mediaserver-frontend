<script setup lang="ts">
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useHead } from '@unhead/vue';
import { useI18n } from 'vue-i18n';
import { useApi } from '@/composables/use-api.ts';
import { usePagination } from '@/composables/use-pagination.ts';
import VideoPreview from '@/components/video/preview.vue';
import type { ListVideo } from '@/types/model/video.ts';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationFirst,
  PaginationLast,
} from '@/components/ui/pagination';

const route = useRoute();
const router = useRouter();
const { t } = useI18n();
const api = useApi();
const { meta, setMeta } = usePagination(loadVideos);

const loading = ref(false);
const videos = ref<ListVideo[]>([]);

async function loadVideos() {
  if (loading.value) return;

  loading.value = true;
  try {
    const {
      data: { items, meta: receivedMeta },
    } = await api.videos.list({ page: meta.value.page, limit: meta.value.limit });
    videos.value = items;
    setMeta(receivedMeta);
  } catch {}
  loading.value = false;
}

function setPage(page: number) {
  window.scrollTo({ top: 0, behavior: 'smooth' });
  router.push({ ...route, query: { ...route.query, page } });
}

loadVideos();

useHead(() => ({
  title: t('pages.index.meta.title'),
}));
</script>

<template>
  <div>
    <div class="grid grid-cols-1 gap-2 md:grid-cols-3 lg:grid-cols-4">
      <VideoPreview v-for="video in videos" :key="video.id" :video />
    </div>

    <Pagination
      v-slot="{ page }"
      :items-per-page="meta.limit"
      :total="meta.count"
      show-edges
      class="mt-4"
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
