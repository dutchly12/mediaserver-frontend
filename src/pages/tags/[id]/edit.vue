<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useHead } from '@unhead/vue';
import { useForm } from 'vee-validate';
import { toast } from 'vue-sonner';
import { useLayout } from '@/composables/use-layout';
import { useApi } from '@/composables/use-api';
import { FormInput } from '@/components/form';
import { UiButton } from '@/components/ui';
import type { Tag, TagUpdateRequestData } from '@/types/model/tag';

type TagForm = TagUpdateRequestData['tag'];

const route = useRoute();
const router = useRouter();
const { t } = useI18n();
const { handleSubmit, setFieldValue } = useForm<TagForm>({
  initialValues: {
    name: '',
  },
});
const api = useApi();

const loading = ref(false);
const tag = ref<Tag>();

const tagId = computed(() => route.params.id as string);

const loadTag = async () => {
  if (loading.value) return;

  loading.value = true;
  try {
    const { data } = await api.tags.one(tagId.value);
    tag.value = data;

    setFieldValue('name', data.name);
  } catch {}
  loading.value = false;
};

const updateTag = handleSubmit(async (tag, { setErrors }) => {
  if (loading.value) return;

  loading.value = true;
  try {
    const { data } = await api.tags.update(tagId.value, { tag });

    toast.success(t('pages.tags.id.edit.notifications.updated'), {
      closeButton: true,
    });

    await router.push({ name: 'tags-id', params: { id: data.id } });
  } catch (e) {
    if (api.isAxiosError(e) && e.response?.status === 422) {
      setErrors(e.response.data.fields);
    } else {
      toast.error(t('notifications.server_error'), { closeButton: true });
    }
  }
  loading.value = false;
});

loadTag();

useLayout(() => ({
  title: t('pages.tags.id.edit.title'),
}));

useHead(() => ({
  title: t('pages.tags.id.edit.meta.title', { name: tag.value?.name }),
}));
</script>

<template>
  <form class="max-w-150 flex flex-col gap-4" @submit="updateTag">
    <FormInput
      :label="$t('pages.tags.id.edit.form.name.label')"
      :placeholder="t('pages.tags.id.edit.form.name.placeholder')"
      :disabled="loading"
      name="name"
    />

    <UiButton :disabled="loading" type="submit" class="self-baseline">
      {{ $t('actions.update') }}
    </UiButton>
  </form>
</template>
