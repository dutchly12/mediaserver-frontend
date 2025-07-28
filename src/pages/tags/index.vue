<script setup lang="ts">
import { ref } from 'vue';
import { useHead } from '@unhead/vue';
import { useI18n } from 'vue-i18n';
import { useApi } from '@/composables/use-api.ts';
import type { Tag } from '@/types/model/tag.ts';

const { t } = useI18n();
const api = useApi();

const loading = ref(false);
const tags = ref<Tag[]>([]);

const loadTags = async () => {
  if (loading.value) return;

  loading.value = true;
  try {
    const { data } = await api.tags.list();
    tags.value = data;
  } catch {}
  loading.value = false;
};

loadTags();

useHead(() => ({
  title: t('pages.tags.index.meta.title'),
}));
</script>

<template>
  <div>tags</div>
</template>
