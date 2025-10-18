<script setup lang="ts">
import { ref } from 'vue';
import { useHead } from '@unhead/vue';
import { useI18n } from 'vue-i18n';
import { useLayout } from '@/composables/use-layout';
import { useApi } from '@/composables/use-api';
import { ImageOff, Plus } from 'lucide-vue-next';
import type { Person } from '@/types/model/person';
import { AspectRatio } from '@/components/ui/aspect-ratio';

const { t } = useI18n();
const api = useApi();

const loading = ref(false);
const people = ref<Person[]>([]);

const loadPeople = async () => {
  if (loading.value) return;

  loading.value = true;
  try {
    const { data } = await api.people.list();
    people.value = data;
  } catch {}
  loading.value = false;
};

loadPeople();

useLayout(() => ({
  title: t('pages.people.index.title'),
  actions: [
    {
      key: 'new',
      type: 'link',
      icon: Plus,
      to: { name: 'people-new' },
    },
  ],
}));

useHead(() => ({
  title: t('pages.people.index.meta.title'),
}));
</script>

<template>
  <div class="px-2 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
    <RouterLink
      v-for="person in people"
      :key="person.id"
      :to="{ name: 'people-id', params: { id: person.id } }"
      class="flex flex-col gap-1"
    >
      <AspectRatio :ratio="4 / 6">
        <img
          v-if="person.picture"
          :src="person.picture"
          :alt="person.name"
          class="w-full h-full object-cover rounded-xl"
        />

        <div v-else class="w-full h-full flex justify-center items-center border rounded-xl">
          <ImageOff class="h-[30%] w-fit aspect-square text-white" />
        </div>
      </AspectRatio>

      {{ person.name }}
    </RouterLink>
  </div>
</template>
