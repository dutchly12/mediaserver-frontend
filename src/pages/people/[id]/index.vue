<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useHead } from '@unhead/vue';
import { useApi } from '@/composables/use-api';
import Text from '@/components/ui/Text.vue';
import VideoList from '@/components/video/list.vue';
import { Button } from '@/components/ui/button';
import { Settings2 } from 'lucide-vue-next';
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

useHead(() => ({
  title: person.value?.name,
}));
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex justify-between items-center">
      <Text variant="h2">
        {{ person?.name }}
      </Text>

      <RouterLink :to="{ name: 'people-id-edit', params: { id: personId } }">
        <Button variant="outline" size="icon">
          <Settings2 />
        </Button>
      </RouterLink>
    </div>

    <VideoList :params="{ person_ids: [personId] }" />
  </div>
</template>
