<script setup lang="ts">
import { ref } from 'vue';
import { useHead } from '@unhead/vue';
import { useI18n } from 'vue-i18n';
import { useApi } from '@/composables/use-api.ts';
import { Plus } from 'lucide-vue-next';
import { Button } from '@/components/ui/button';
import Text from '@/components/ui/Text.vue';
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
  <div class="flex flex-col gap-4">
    <div class="p-2 flex justify-between items-center">
      <Text variant="h2">
        {{ $t('pages.tags.index.title') }}
      </Text>

      <RouterLink :to="{ name: 'tags-new' }">
        <Button variant="outline" size="icon">
          <Plus />
        </Button>
      </RouterLink>
    </div>

    <div>
      <RouterLink
        v-for="tag in tags"
        :key="tag.id"
        :to="{ name: 'tags-id', params: { id: tag.id } }"
      >
        <Text>
          {{ tag.name }}
        </Text>
      </RouterLink>
    </div>
  </div>
</template>
