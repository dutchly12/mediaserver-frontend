<script setup lang="ts">
import { ref } from 'vue';
import { useHead } from '@unhead/vue';
import { useI18n } from 'vue-i18n';
import { useLayout } from '@/composables/use-layout';
import { useApi } from '@/composables/use-api';
import { Plus } from 'lucide-vue-next';
import { UiText } from '@/components/ui';
import type { Tag } from '@/types/model/tag';

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

useLayout(() => ({
  title: t('pages.tags.index.title'),
  actions: [
    {
      key: 'new',
      type: 'link',
      icon: Plus,
      to: { name: 'tags-new' },
    },
  ],
}));

useHead(() => ({
  title: t('pages.tags.index.meta.title'),
}));
</script>

<template>
  <div>
    <RouterLink v-for="tag in tags" :key="tag.id" :to="{ name: 'tags-id', params: { id: tag.id } }">
      <UiText>
        {{ tag.name }}
      </UiText>
    </RouterLink>
  </div>
</template>
