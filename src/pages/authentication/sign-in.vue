<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useHead } from '@unhead/vue';
import { useI18n } from 'vue-i18n';
import { useUserStore } from '@/stores/user.ts';
import UiText from '@/components/ui/text.vue';
import UiFormInput from '@/components/ui/form/input.vue';
import UiButton from '@/components/ui/button.vue';

const router = useRouter();
const { t } = useI18n();
const userStore = useUserStore();

const loading = ref(false);
const form = ref({
  email: '',
  password: '',
});

const signIn = async () => {
  if (loading.value) return;

  loading.value = true;
  try {
    await userStore.signIn(form.value);
    await router.push({ name: 'index' });
  } catch {}
  loading.value = false;
};

useHead(() => ({
  title: t('pages.authentication.sign_in.meta.title'),
}));
</script>

<template>
  <div>
    <UiText variant="h1" align="center">
      {{ $t('pages.authentication.sign_in.title') }}
    </UiText>

    <div class="p-6 rounded-xl border-solid border-1 border-gray">
      <form class="flex flex-col gap-2" @submit.prevent="signIn">
        <UiFormInput
          v-model="form.email"
          :label="$t('pages.authentication.sign_in.form.email.label')"
          :placeholder="$t('pages.authentication.sign_in.form.email.placeholder')"
          name="email"
          type="email"
        />

        <UiFormInput
          v-model="form.password"
          :label="$t('pages.authentication.sign_in.form.password.label')"
          :placeholder="$t('pages.authentication.sign_in.form.password.placeholder')"
          name="password"
          type="password"
        />

        <UiButton type="submit">
          {{ $t('pages.authentication.sign_in.form.action') }}
        </UiButton>
      </form>
    </div>
  </div>
</template>
