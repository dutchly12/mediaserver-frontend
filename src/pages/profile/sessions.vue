<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useLayout } from '@/composables/use-layout';
import { useHead } from '@unhead/vue';
import { useApi } from '@/composables/use-api';
import AuthenticationItem from '@/components/authentications/item.vue';
import type { Authentication } from '@/types/model/authentication';

const { t } = useI18n();
const api = useApi();

const loading = ref(false);
const authentications = ref<Authentication[]>([]);

const loadAuthentications = async () => {
  if (loading.value) return;

  loading.value = true;
  try {
    const { data } = await api.authentications.list();
    authentications.value = data;
  } catch {}
  loading.value = false;
};

loadAuthentications();

useLayout(() => ({
  title: t('pages.profile.sessions.title'),
}));

useHead(() => ({
  title: t('pages.profile.sessions.meta.title'),
}));
</script>

<template>
  <div class="flex flex-col gap-4">
    <AuthenticationItem
      v-for="authentication in authentications"
      :key="authentication.id"
      :authentication
    />
  </div>
</template>
