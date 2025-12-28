<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useHead } from '@unhead/vue';
import { useForm } from 'vee-validate';
import { toast } from 'vue-sonner';
import { useLayout } from '@/composables/use-layout';
import { useApi } from '@/composables/use-api';
import { FormInput } from '@/components/form';
import { UiButton } from '@/components/ui';
import type { TagCreateRequestData } from '@/types/model/tag';

type TagForm = TagCreateRequestData['tag'];

const router = useRouter();
const { t } = useI18n();
const { handleSubmit } = useForm<TagForm>({
  initialValues: {
    name: '',
  },
});
const api = useApi();

const loading = ref(false);

const saveTag = handleSubmit(async (tag, { setErrors }) => {
  if (loading.value) return;

  loading.value = true;
  try {
    const { data } = await api.tags.create({ tag });

    toast.success(t('pages.tags.new.notifications.created'), {
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

useLayout(() => ({
  title: t('pages.tags.new.title'),
}));

useHead(() => ({
  title: t('pages.tags.new.meta.title'),
}));
</script>

<template>
  <form class="max-w-150 flex flex-col gap-4" @submit="saveTag">
    <FormInput
      :label="$t('pages.tags.new.form.name.label')"
      :placeholder="t('pages.tags.new.form.name.placeholder')"
      :disabled="loading"
      name="name"
    />

    <UiButton :disabled="loading" type="submit" class="self-baseline">
      {{ $t('actions.create') }}
    </UiButton>
  </form>
</template>
