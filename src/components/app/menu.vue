<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useCollectionsStore } from '@/stores/collections.ts';
import UiButton from '@/components/ui/button.vue';
import UiIcon from '@/components/ui/icon.vue';

const route = useRoute();
const collectionsStore = useCollectionsStore();

collectionsStore.loadCollections();

const menuState = ref(false);

const switchMenu = () => {
  menuState.value = !menuState.value;
};

watch(
  () => route.fullPath,
  () => {
    if (menuState.value) menuState.value = false;
  },
);
</script>

<template>
  <div
    class="fixed left-0 top-0 z-1000 w-screen h-12.5 px-2 flex justify-between items-center gap-4 border-solid border-gray-4 border-b bg-white dark:bg-black"
    lg="w-70 h-screen py-2 flex-col items-start border-b-none border-r"
  >
    <RouterLink
      :to="{ name: 'index' }"
      class="block font-700 text-2xl self-center"
      lg="text-center"
    >
      {{ $t('meta.title') }}
    </RouterLink>

    <UiButton variant="outlined" compact lg="hidden" @click="switchMenu">
      <UiIcon name="menu" size="1rem" />
    </UiButton>

    <div
      :class="[
        'fixed',
        'left-0',
        'top-12.5',
        'bottom-0',
        'w-full',
        'grow',
        'flex-col',
        'justify-between',
        'bg-inherit',
        menuState ? 'flex' : 'hidden',
      ]"
      lg="static flex"
    >
      <div>
        <RouterLink
          v-for="collection in collectionsStore.collections"
          :key="collection.id"
          :to="{ name: 'collections-id', params: { id: collection.id } }"
          class="block py-2"
        >
          {{ collection.name }}
        </RouterLink>
      </div>

      <div class="w-full flex flex-col justify-center gap-2">
        <UiButton color="blue" :to="{ name: 'collections-new' }">
          {{ $t('labels.new_collection') }}
        </UiButton>

        <UiButton :to="{ name: 'uploads' }">
          {{ $t('labels.uploads') }}
        </UiButton>
      </div>
    </div>
  </div>
</template>
