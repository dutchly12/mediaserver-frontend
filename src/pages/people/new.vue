<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useHead } from '@unhead/vue';
import { useApi } from '@/composables/use-api.ts';
import { useForm } from 'vee-validate';
import Text from '@/components/ui/Text.vue';
import { FormControl, FormItem, FormLabel, FormMessage, FormField } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import type { PersonCreateRequestData } from '@/types/model/person.ts';
import { toast } from 'vue-sonner';

type PersonForm = PersonCreateRequestData['person'];

const router = useRouter();
const { t } = useI18n();
const { handleSubmit } = useForm<PersonForm>({
  initialValues: {
    name: '',
  },
});
const api = useApi();

const loading = ref(false);

const savePerson = handleSubmit(async (person, { setErrors }) => {
  if (loading.value) return;

  loading.value = true;
  try {
    const { data } = await api.people.create({ person });

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

useHead(() => ({
  title: t('pages.people.new.meta.title'),
}));
</script>

<template>
  <div>
    <Text variant="h2" class="mb-4">
      {{ $t('pages.people.new.title') }}
    </Text>

    <form @submit="savePerson" class="max-w-[500px] flex flex-col gap-4">
      <FormField name="name" v-slot="{ componentField }">
        <FormItem>
          <FormLabel>
            {{ $t('pages.people.new.form.name.label') }}
          </FormLabel>

          <FormControl>
            <Input
              :placeholder="t('pages.people.new.form.name.placeholder')"
              :disabled="loading"
              v-bind="componentField"
            />
          </FormControl>

          <FormMessage />
        </FormItem>
      </FormField>

      <Button :disabled="loading" type="submit" class="self-baseline">
        {{ $t('actions.create') }}
      </Button>
    </form>
  </div>
</template>
