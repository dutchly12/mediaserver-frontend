import { ref, computed, watch, readonly } from 'vue';
import { useRoute } from 'vue-router';
import type { PaginationMeta } from '@/types/common.ts';

const DEFAULT_META: PaginationMeta = {
  count: 0,
  limit: 0,
  page: 1,
  pages: 0,
};

export const usePagination = (callback: () => Promise<unknown>) => {
  const route = useRoute();

  const meta = ref<PaginationMeta>(structuredClone(DEFAULT_META));

  const routeLimit = computed(() => Number(route.query.limit) || 36);
  const routePage = computed(() => Number(route.query.page) || 1);

  const setMeta = (data: PaginationMeta) => {
    meta.value.count = data.count;
    meta.value.pages = data.pages;
  };

  watch(
    () => [route.query.page, route.query.limit],
    (_, oldValue) => {
      meta.value.limit = routeLimit.value;
      meta.value.page = routePage.value;

      if (oldValue) callback();
    },
    { immediate: true },
  );

  return {
    meta: readonly(meta),
    setMeta,
  };
};
