<script setup lang="ts">
import { ref } from 'vue';
import { useHead } from '@unhead/vue';
import { useI18n } from 'vue-i18n';
import { useApi } from '@/composables/use-api.ts';
import Text from '@/components/ui/Text.vue';
import UiIcon from '@/components/ui/icon.vue';
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
  <div class="flex flex-col gap-4">
    <div class="p-2 flex justify-between items-center">
      <Text variant="h2">
        {{ $t('pages.people.index.title') }}
      </Text>

      <UiIcon name="square-rounded-plus" class="size-10 cursor-pointer" />
    </div>

    <div class="px-2 flex flex-col gap-2">
      <RouterLink
        v-for="person in people"
        :key="person.id"
        :to="{ name: 'people-id', params: { id: person.id } }"
      >
        {{ person.name }}
      </RouterLink>
    </div>
  </div>
</template>
