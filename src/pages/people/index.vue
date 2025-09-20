<script setup lang="ts">
import { ref } from 'vue';
import { useHead } from '@unhead/vue';
import { useI18n } from 'vue-i18n';
import { useLayout } from '@/composables/use-layout';
import { useApi } from '@/composables/use-api';
import { Plus } from 'lucide-vue-next';
import type { Person } from '@/types/model/person';

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
  <div class="px-2 flex flex-col gap-2">
    <RouterLink
      v-for="person in people"
      :key="person.id"
      :to="{ name: 'people-id', params: { id: person.id } }"
    >
      {{ person.name }}
    </RouterLink>
  </div>
</template>
