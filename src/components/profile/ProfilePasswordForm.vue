<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useForm } from 'vee-validate';
import * as z from 'zod';
import { toTypedSchema } from '@vee-validate/zod';
import { UiButton } from '@/components/ui';
import { FormInput } from '@/components/form';
import { computed } from 'vue';

const { t } = useI18n();

const validationSchema = computed(() =>
  z
    .object({
      old_password: z.string(),
      new_password: z.string().min(10),
      new_password_confirmation: z.string().min(10),
    })
    .refine((schema) => schema.new_password === schema.new_password_confirmation, {
      path: ['new_password_confirmation'],
      error: t('pages.profile.security.password_dont_match'),
    }),
);

const form = useForm({
  validationSchema: toTypedSchema(validationSchema.value),
  initialValues: {
    old_password: '',
    new_password: '',
    new_password_confirmation: '',
  },
});

const updatePassword = form.handleSubmit((values) => {
  console.log(values);
});
</script>

<template>
  <form class="flex flex-col gap-2" @submit="updatePassword">
    <FormInput
      :label="$t('pages.profile.security.password_form.old_password.label')"
      :placeholder="$t('pages.profile.security.password_form.old_password.placeholder')"
      name="old_password"
      type="password"
    />

    <FormInput
      :label="$t('pages.profile.security.password_form.new_password.label')"
      :placeholder="$t('pages.profile.security.password_form.new_password.placeholder')"
      name="new_password"
      type="password"
    />

    <FormInput
      :label="$t('pages.profile.security.password_form.new_password_confirmation.label')"
      :placeholder="
        $t('pages.profile.security.password_form.new_password_confirmation.placeholder')
      "
      name="new_password_confirmation"
      type="password"
    />

    <UiButton type="submit" class="self-baseline">
      {{ $t('actions.update') }}
    </UiButton>
  </form>
</template>
