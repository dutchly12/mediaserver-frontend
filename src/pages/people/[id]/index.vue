<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useHead } from '@unhead/vue';
import { useApi } from '@/composables/use-api.ts';
import { usePagination } from '@/composables/use-pagination.ts';
import Text from '@/components/ui/Text.vue';
import VideoPreview from '@/components/video/preview.vue';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationFirst,
  PaginationItem,
  PaginationLast,
} from '@/components/ui/pagination';
import type { ListVideo } from '@/types/model/video.ts';
import type { Person } from '@/types/model/person.ts';
import { Button } from '@/components/ui/button';
import { Settings2 } from 'lucide-vue-next';

const route = useRoute();
const router = useRouter();
const api = useApi();
const { meta, setMeta } = usePagination(loadVideos);

const loading = ref(false);
const person = ref<Person>();
const videos = ref<ListVideo[]>([]);

const personId = computed(() => route.params.id as string);

async function loadPerson() {
  try {
    const { data } = await api.people.one(personId.value);
    person.value = data;
  } catch {}
}

async function loadVideos() {
  try {
    const {
      data: { meta: receivedMeta, items },
    } = await api.videos.list({
      page: meta.value.page,
      limit: meta.value.limit,
      person_ids: [personId.value],
    });
    setMeta(receivedMeta);
    videos.value = items;
  } catch {}
}

function setPage(page: number) {
  window.scrollTo({ top: 0, behavior: 'smooth' });
  router.push({ ...route, query: { ...route.query, page } });
}

async function init() {
  if (loading.value) return;

  loading.value = true;
  await Promise.all([loadPerson(), loadVideos()]);
  loading.value = false;
}

init();

useHead(() => ({
  title: person.value?.name,
}));
</script>

<template>
  <div>
    <div class="mb-4 flex justify-between items-center">
      <Text variant="h2">
        {{ person?.name }}
      </Text>

      <RouterLink :to="{ name: 'people-id-edit', params: { id: personId } }">
        <Button variant="outline" size="icon">
          <Settings2 />
        </Button>
      </RouterLink>
    </div>

    <div class="grid grid-cols-1 gap-2 md:grid-cols-3 lg:grid-cols-4">
      <VideoPreview v-for="video in videos" :key="video.id" :video />
    </div>

    <Pagination
      v-if="videos?.length"
      :page="meta.page"
      :items-per-page="meta.limit"
      :total="meta.count"
      show-edges
      class="mt-4"
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
