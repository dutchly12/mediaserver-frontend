<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useHead } from '@unhead/vue';
import { useApi } from '@/composables/use-api';
import Text from '@/components/ui/Text.vue';
import VideoList from '@/components/video/list.vue';
import { Button } from '@/components/ui/button';
import { Settings2 } from 'lucide-vue-next';
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

useHead(() => ({
  title: tag.value?.name,
}));
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex justify-between items-center">
      <Text variant="h2">
        {{ tag?.name }}
      </Text>

      <RouterLink :to="{ name: 'tags-id-edit', params: { id: tagId } }">
        <Button variant="outline" size="icon">
          <Settings2 />
        </Button>
      </RouterLink>
    </div>

    <VideoList :params="{ tag_ids: [tagId] }" />
  </div>
</template>
