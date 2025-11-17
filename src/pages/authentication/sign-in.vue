<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useHead } from '@unhead/vue';
import { useI18n } from 'vue-i18n';
import { KeySquare } from 'lucide-vue-next';
import { useUserStore } from '@/stores/user';
import Text from '@/components/ui/Text.vue';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const router = useRouter();
const { t } = useI18n();
const userStore = useUserStore();

const loading = ref(false);
const form = ref({
  email: '',
  password: '',
});

const signIn = async (type: 'base' | 'passkey') => {
  if (loading.value) return;

  loading.value = true;
  try {
    await (type === 'base' ? userStore.signInBase(form.value) : userStore.signInPasskey());
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
    <Text variant="h1" align="center" class="mb-4">
      {{ $t('pages.authentication.sign_in.title') }}
    </Text>

    <div class="p-6 rounded-xl border-solid border-1 border-gray flex flex-col gap-4">
      <Form class="flex flex-col gap-4" @submit="() => signIn('base')">
        <FormField name="email" v-slot="{ componentField }">
          <FormItem>
            <FormLabel>
              {{ $t('pages.authentication.sign_in.form.email.label') }}
            </FormLabel>

            <FormControl>
              <Input
                v-bind="componentField"
                v-model="form.email"
                :disabled="loading"
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
                :disabled="loading"
                :placeholder="$t('pages.authentication.sign_in.form.password.placeholder')"
                type="password"
              />
            </FormControl>

            <FormMessage />
          </FormItem>
        </FormField>

        <Button :disabled="loading" type="submit">
          {{ $t('pages.authentication.sign_in.form.action') }}
        </Button>
      </Form>

      <Button :disabled="loading" variant="outline" @click="() => signIn('passkey')">
        <KeySquare />
        {{ $t('pages.authentication.sign_in.sign_in_with_passkey') }}
      </Button>
    </div>
  </div>
</template>
