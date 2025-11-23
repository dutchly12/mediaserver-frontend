<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useHead } from '@unhead/vue';
import { useForm } from 'vee-validate';
import { toast } from 'vue-sonner';
import { useLayout } from '@/composables/use-layout';
import { useApi } from '@/composables/use-api';
import { Input } from '@/components/ui/input';
import { UiButton, UiField } from '@/components/ui';
import type { PersonCreateRequestData } from '@/types/model/person';

type PersonForm = PersonCreateRequestData['person'];

const router = useRouter();
const { t } = useI18n();
const { handleSubmit } = useForm<PersonForm>({
  initialValues: {
    name: '',
    picture: undefined,
  },
});
const api = useApi();

const loading = ref(false);

const savePerson = handleSubmit(async (person, { setErrors }) => {
  if (loading.value) return;

  loading.value = true;
  try {
    const formData = new FormData();
    formData.append('person[name]', person.name);
    if (person.picture) {
      formData.append('person[picture]', person.picture);
    }

    const { data } = await api.people.create(formData);

    toast.success(t('pages.people.new.notifications.created'), {
      closeButton: true,
    });

    await router.push({ name: 'people-id', params: { id: data.id } });
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
  title: t('pages.people.new.title'),
}));

useHead(() => ({
  title: t('pages.people.new.meta.title'),
}));
</script>

<template>
  <form class="max-w-[500px] flex flex-col gap-4" @submit="savePerson">
    <UiField v-slot="{ field }" :label="$t('pages.people.new.form.name.label')" name="name">
      <Input
        :placeholder="t('pages.people.new.form.name.placeholder')"
        :disabled="loading"
        v-bind="field"
      />
    </UiField>

    <UiField v-slot="{ field }" :label="$t('pages.people.new.form.picture.label')" name="picture">
      <Input :disabled="loading" v-bind="field" type="file" />
    </UiField>

    <UiButton :disabled="loading" type="submit" class="self-baseline">
      {{ $t('actions.create') }}
    </UiButton>
  </form>
</template>
