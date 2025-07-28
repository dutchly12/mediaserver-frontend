<script setup lang="ts">
import { ref } from 'vue';
import { useHead } from '@unhead/vue';
import { useI18n } from 'vue-i18n';
import { useApi } from '@/composables/use-api.ts';
import type { Person } from '@/types/model/person.ts';

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

useHead(() => ({
  title: t('pages.people.index.meta.title'),
}));
</script>

<template>
  <div>people</div>
</template>
