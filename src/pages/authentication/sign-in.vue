<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useHead } from '@unhead/vue';
import { useI18n } from 'vue-i18n';
import { useUserStore } from '@/stores/user.ts';
import UiText from '@/components/ui/text.vue';
import { Form } from 'vee-validate';
import { Button } from '@/components/ui/button';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

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
    <UiText variant="h1" align="center" class="mb-4">
      {{ $t('pages.authentication.sign_in.title') }}
    </UiText>

    <div class="p-6 rounded-xl border-solid border-1 border-gray">
      <Form class="flex flex-col gap-4" @submit="signIn">
        <FormField name="email" v-slot="{ componentField }">
          <FormItem>
            <FormLabel>
              {{ $t('pages.authentication.sign_in.form.email.label') }}
            </FormLabel>

            <FormControl>
              <Input
                v-bind="componentField"
                v-model="form.email"
                :placeholder="$t('pages.authentication.sign_in.form.email.placeholder')"
                type="email"
              />
            </FormControl>

            <FormMessage />
          </FormItem>
        </FormField>

        <FormField name="password" v-slot="{ componentField }">
          <FormItem>
            <FormLabel>
              {{ $t('pages.authentication.sign_in.form.password.label') }}
            </FormLabel>

            <FormControl>
              <Input
                v-bind="componentField"
                v-model="form.password"
                :placeholder="$t('pages.authentication.sign_in.form.password.placeholder')"
                type="password"
              />
            </FormControl>

            <FormMessage />
          </FormItem>
        </FormField>

        <Button type="submit">
          {{ $t('pages.authentication.sign_in.form.action') }}
        </Button>
      </Form>
    </div>
  </div>
</template>
