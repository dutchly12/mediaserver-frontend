<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useHead } from '@unhead/vue';
import { useLayout } from '@/composables/use-layout';
import { useApi } from '@/composables/use-api';
import { Settings2 } from 'lucide-vue-next';
import VideoList from '@/components/video/list.vue';
import type { Person } from '@/types/model/person';

const route = useRoute();
const api = useApi();

const loading = ref(false);
const person = ref<Person>();

const personId = computed(() => route.params.id as string);

async function loadPerson() {
  if (loading.value) return;

  loading.value = true;
  try {
    const { data } = await api.people.one(personId.value);
    person.value = data;
  } catch {}
  loading.value = false;
}

loadPerson();

useLayout(() => ({
  title: person.value?.name,
  actions: [
    {
      key: 'edit',
      icon: Settings2,
      type: 'link',
      to: { name: 'people-id-edit', params: { id: personId.value } },
    },
  ],
}));

useHead(() => ({
  title: person.value?.name,
}));
</script>

<template>
  <VideoList :params="{ person_ids: [personId] }" />
</template>
