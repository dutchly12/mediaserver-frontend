<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useHead } from '@unhead/vue';
import { useI18n } from 'vue-i18n';
import { useForm } from 'vee-validate';
import { KeySquare } from 'lucide-vue-next';
import * as z from 'zod';
import { toTypedSchema } from '@vee-validate/zod';
import { useApi } from '@/composables/use-api';
import { useUserStore } from '@/stores/user';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { UiField, UiText } from '@/components/ui';

const formSchema = z.object({
  email: z.email(),
  password: z.string().min(10),
});

const router = useRouter();
const { t } = useI18n();
const api = useApi();
const userStore = useUserStore();
const form = useForm({
  validationSchema: toTypedSchema(formSchema),
  initialValues: {
    email: '',
    password: '',
  },
});

const loading = ref(false);

const moveToApp = async () => {
  await router.push({ name: 'index' });
};

const handleBaseFormSubmit = form.handleSubmit(async (values, ctx) => {
  if (loading.value) return;

  try {
    loading.value = true;

    await userStore.signInBase(values);
    await moveToApp();
  } catch (e) {
    if (api.isAxiosError(e) && e.response?.status === 401) {
      ctx.setFieldError('password', e.response.data.message);
    }
  } finally {
    loading.value = false;
  }
});

const handlePasskeySignIn = async () => {
  if (loading.value) return;

  try {
    loading.value = true;

    await userStore.signInPasskey();
    await moveToApp();
  } catch {
  } finally {
    loading.value = false;
  }
};

useHead(() => ({
  title: t('pages.authentication.sign_in.meta.title'),
}));
</script>

<template>
  <div>
    <UiText variant="h1" align="center" class="mb-4">
      {{ $t('pages.authentication.sign_in.title') }}
    </UiText>

    <div class="p-6 rounded-xl border-solid border-1 border-gray flex flex-col gap-4">
      <form class="flex flex-col gap-4" @submit="handleBaseFormSubmit">
        <UiField
          v-slot="{ field }"
          :label="$t('pages.authentication.sign_in.form.email.label')"
          name="email"
        >
          <Input
            v-bind="field"
            :disabled="loading"
            :placeholder="$t('pages.authentication.sign_in.form.email.placeholder')"
            type="email"
          />
        </UiField>

        <UiField
          v-slot="{ field }"
          :label="$t('pages.authentication.sign_in.form.password.label')"
          name="password"
        >
          <Input
            v-bind="field"
            :disabled="loading"
            :placeholder="$t('pages.authentication.sign_in.form.password.placeholder')"
            type="password"
          />
        </UiField>

        <Button :disabled="loading" type="submit">
          {{ $t('pages.authentication.sign_in.form.action') }}
        </Button>
      </form>

      <Button :disabled="loading" variant="outline" @click="handlePasskeySignIn">
        <KeySquare />
        {{ $t('pages.authentication.sign_in.sign_in_with_passkey') }}
      </Button>
    </div>
  </div>
</template>
