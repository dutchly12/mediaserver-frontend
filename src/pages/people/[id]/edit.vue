<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useHead } from '@unhead/vue';
import { useLayout } from '@/composables/use-layout';
import { useApi } from '@/composables/use-api';
import { useForm } from 'vee-validate';
import { toast } from 'vue-sonner';
import { Input } from '@/components/ui/input';
import type { Person, PersonUpdateRequestData } from '@/types/model/person';
import { UiButton, UiField } from '@/components/ui';

type PersonForm = PersonUpdateRequestData['person'];

const route = useRoute();
const router = useRouter();
const { t } = useI18n();
const { handleSubmit, setFieldValue } = useForm<PersonForm>({
  initialValues: {
    name: '',
    picture: undefined,
  },
});
const api = useApi();

const loading = ref(false);
const person = ref<Person>();

const personId = computed(() => route.params.id as string);

const loadPerson = async () => {
  if (loading.value) return;

  loading.value = true;
  try {
    const { data } = await api.people.one(personId.value);
    person.value = data;

    setFieldValue('name', data.name);
  } catch {}
  loading.value = false;
};

const updatePerson = handleSubmit(async (person, { setErrors }) => {
  if (loading.value) return;

  loading.value = true;
  try {
    const formData = new FormData();
    formData.append('person[name]', person.name);
    if (person.picture) {
      formData.append('person[picture]', person.picture);
    }

    const { data } = await api.people.update(personId.value, formData);

    toast.success(t('pages.people.id.edit.notifications.updated'), {
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

loadPerson();

useLayout(() => ({
  title: t('pages.people.id.edit.title'),
}));

useHead(() => ({
  title: t('pages.people.id.edit.meta.title', { name: person.value?.name }),
}));
</script>

<template>
  <div>
    <form @submit="updatePerson" class="max-w-[500px] flex flex-col gap-4">
      <UiField :label="$t('pages.people.id.edit.form.name.label')" name="name" v-slot="{ field }">
        <Input
          :placeholder="t('pages.people.id.edit.form.name.placeholder')"
          :disabled="loading"
          v-bind="field"
        />
      </UiField>

      <UiField
        :label="$t('pages.people.id.edit.form.picture.label')"
        name="picture"
        v-slot="{ field }"
      >
        <Input :disabled="loading" type="file" v-bind="field" />
      </UiField>

      <UiButton :disabled="loading" type="submit" class="self-baseline">
        {{ $t('actions.update') }}
      </UiButton>
    </form>
  </div>
</template>
