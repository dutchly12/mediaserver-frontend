<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import UiButton from '@/components/ui/button.vue';
import UiIcon from '@/components/ui/icon.vue';
import type { IconName } from '@/types/assets/icons.ts';

const route = useRoute();
const { t } = useI18n();

const menuState = ref(false);

const menuItems = computed<{ title: string; routeName: string; icon: IconName }[]>(() => [
  {
    title: t('labels.people'),
    routeName: 'people',
    icon: 'user-filled',
  },
  {
    title: t('labels.tags'),
    routeName: 'tags',
    icon: 'tag-filled',
  },
]);

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
    class="fixed left-0 top-0 z-1000 w-screen h-12.5 px-2 flex justify-between items-center gap-4 border-solid border-gray-4 border-b bg-white dark:bg-black lg:w-70 lg:h-screen lg:py-2 lg:flex-col lg:items-start lg:border-b-none lg:border-r"
  >
    <RouterLink :to="{ name: 'index' }" class="block font-700 text-2xl self-center lg:text-center">
      {{ $t('meta.title') }}
    </RouterLink>

    <UiButton variant="outlined" compact class="lg:hidden" @click="switchMenu">
      <UiIcon name="menu-2" class="size-4" />
    </UiButton>

    <div
      :class="[
        'fixed',
        'left-0',
        'top-12.5',
        'bottom-0',
        'w-full',
        'grow',
        'p-2',
        'flex-col',
        'justify-between',
        'bg-inherit',
        menuState ? 'flex' : 'hidden',
        'lg:static',
        'pg:p-0',
        'lg:flex',
      ]"
    >
      <div>
        <RouterLink
          v-for="item in menuItems"
          :key="item.routeName"
          :to="{ name: item.routeName }"
          class="py-3 flex items-center gap-2"
        >
          <UiIcon :name="item.icon" class="size-6" />

          <span>{{ item.title }}</span>
        </RouterLink>
      </div>

      <div class="w-full flex flex-col justify-center gap-2">
        <UiButton :to="{ name: 'uploads' }">
          {{ $t('labels.uploads') }}
        </UiButton>
      </div>
    </div>
  </div>
</template>
