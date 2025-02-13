<script setup lang="ts">
import { useCollectionsStore } from '@/stores/collections.ts';

const collectionsStore = useCollectionsStore();

collectionsStore.loadCollections();
</script>

<template>
  <div class="fixed left-0 top-0 w-screen h-12.5 px-2 border-solid border-gray-4 border-b flex items-center bg-white md:w-60 md:h-screen md:py-2 md:flex-col md:items-start md:border-b-none md:border-r">
    <RouterLink :to="{ name: 'index' }" class="font-700 text-2xl self-center md:mb-6">
      {{ $t('meta.title') }}
    </RouterLink>

    <div>
      <RouterLink v-for="collection in collectionsStore.collections" :key="collection.id" :to="{ name: 'collections-id', params: { id: collection.id } }">
        {{ collection.name }}
      </RouterLink>
    </div>
  </div>
</template>
