<script setup lang="ts">
import { computed } from 'vue';
import type { PaginationMeta } from '@/types/common.ts';

const props = withDefaults(defineProps<{
  meta: PaginationMeta;
  maxVisiblePages?: number;
}>(), {
  maxVisiblePages: 5,
});

const model = defineModel<number>({ required: true });

const visiblePageNumbers = computed(() => {
  const { page, pages } = props.meta;

  if (pages <= props.maxVisiblePages) {
    return Array.from({ length: pages }, (_, i) => i + 1);
  }

  let start = Math.max(page - Math.floor(props.maxVisiblePages / 2), 1);
  let end = start + props.maxVisiblePages - 1;

  if (end > pages) {
    end = pages;
    start = Math.max(end - props.maxVisiblePages + 1, 1);
  }

  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
});

const isFirstPage = computed(() => props.meta.page === 1);
const isLastPage = computed(() => props.meta.page === props.meta.pages);

const goToPage = (page: number) => {
  if (page < 1 || page > props.meta.pages) return;
  model.value = page;
};

const goToPrevious = () => {
  if (!isFirstPage.value) {
    goToPage(props.meta.page - 1);
  }
};

const goToNext = () => {
  if (!isLastPage.value) {
    goToPage(props.meta.page + 1);
  }
};
</script>

<template>
  <div v-if="props.meta.pages > 1" class="mt-4 flex items-center justify-center gap-1">
    <button
      v-if="visiblePageNumbers[0] > 1"
      :class="props.meta.page === 1 ? 'bg-gray-400 text-white' : 'text-gray-400 hover:bg-gray-500 hover:text-white'"
      class="w-12 px-3 py-2 border border-gray-400 rounded-lg text-center transition-colors cursor-pointer"
      @click="goToPage(1)"
    >
      1
    </button>

    <span v-if="visiblePageNumbers[0] > 2" class="px-3 py-2">...</span>

    <button
      v-for="pageNum in visiblePageNumbers"
      :key="pageNum"
      :class="props.meta.page === pageNum ? 'bg-gray-400 text-white' : 'text-gray-400 hover:bg-gray-500 hover:text-white'"
      class="w-12 px-3 py-2 border border-gray-400 rounded-lg text-center transition-colors cursor-pointer"
      @click="goToPage(pageNum)"
    >
      {{ pageNum }}
    </button>

    <span v-if="visiblePageNumbers[visiblePageNumbers.length - 1] < props.meta.pages - 1" class="px-3 py-2">...</span>

    <button
      v-if="visiblePageNumbers[visiblePageNumbers.length - 1] < props.meta.pages"
      :class="props.meta.page === props.meta.pages ? 'bg-gray-400 text-white' : 'text-gray-400 hover:bg-gray-500 hover:text-white'"
      class="w-12 px-3 py-2 border border-gray-400 rounded-lg text-center transition-colors cursor-pointer"
      @click="goToPage(props.meta.pages)"
    >
      {{ props.meta.pages }}
    </button>
  </div>
</template>
