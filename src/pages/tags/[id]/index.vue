<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useHead } from '@unhead/vue';
import { useLayout } from '@/composables/use-layout';
import { useApi } from '@/composables/use-api';
import { Settings2 } from 'lucide-vue-next';
import VideoList from '@/components/video/list.vue';
import type { Tag } from '@/types/model/tag';

const route = useRoute();
const api = useApi();

const loading = ref(false);
const tag = ref<Tag>();

const tagId = computed(() => route.params.id as string);

async function loadTag() {
  if (loading.value) return;

  loading.value = true;
  try {
    const { data } = await api.tags.one(tagId.value);
    tag.value = data;
  } catch {}
  loading.value = false;
}

loadTag();

useLayout(() => ({
  title: tag.value?.name,
  actions: [
    {
      key: 'edit',
      icon: Settings2,
      type: 'link',
      to: { name: 'tags-id-edit', params: { id: tagId.value } },
    },
  ],
}));

useHead(() => ({
  title: tag.value?.name,
}));
</script>

<template>
  <VideoList :params="{ tag_ids: [tagId] }" />
</template>
