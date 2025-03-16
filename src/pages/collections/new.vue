<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useHead } from '@unhead/vue';
import { useApi } from '@/composables/use-api.ts';
import { useCollectionsStore } from '@/stores/collections.ts';
import UiText from '@/components/ui/text.vue';
import UiFormInput from '@/components/ui/form/input.vue';
import UiButton from '@/components/ui/button.vue';
import type { CollectionCreateData } from '@/types/model/collection.ts';

const router = useRouter();
const { t } = useI18n();
const api = useApi();
const collectionsStore = useCollectionsStore();

const loading = ref(false);
const form = ref<CollectionCreateData['collection']>({
  name: '',
});
const errors = ref<any>();

const handleSubmit = async () => {
  if (loading.value) return;

  errors.value = undefined;
  loading.value = true;
  try {
    const { data } = await api.collections.create({ collection: form.value });
    collectionsStore.loadCollections();
    router.push({ name: 'collections-id', params: { id: data.id } });
  } catch (e) {
    if (api.isAxiosError(e) && e.response?.status === 422) errors.value = e.response.data.fields;
  }
  loading.value = false;
};

useHead(() => ({
  title: t('pages.collections.new.meta.title'),
}));
</script>

<template>
  <div class="flex flex-col gap-4">
    <UiText variant="h2">
      {{ $t('pages.collections.new.title') }}
    </UiText>

    <form class="max-w-100 flex flex-col gap-4" @submit.prevent="handleSubmit">
      <UiFormInput
        v-model="form.name"
        :label="$t('pages.uploads.form.name.label')"
        :placeholder="$t('pages.uploads.form.name.placeholder')"
        :disabled="loading"
        name="name"
      />

      <UiButton color="blue" :disabled="loading" type="submit" class="self-start">
        {{ $t('actions.create') }}
      </UiButton>
    </form>
  </div>
</template>
