import { ref } from 'vue';
import { defineStore } from 'pinia';
import { useApi } from '@/composables/use-api.ts';
import type { Collection } from '@/types/model/collection.ts';

export const useCollectionsStore = defineStore('collections', () => {
  const api = useApi();

  const collections = ref<Collection[]>([]);

  const loadCollections = async () => {
    const { data } = await api.collections.list();
    collections.value = data;
  };

  return {
    collections,
    loadCollections,
  };
});
