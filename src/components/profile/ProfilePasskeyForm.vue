<script setup lang="ts">
import { ref } from 'vue';
import { useApi } from '@/composables/use-api';
import { formatDate } from '@/lib/formatters';
import { useUserStore } from '@/stores/user';
import { UiButton, UiText } from '@/components/ui';
import type { Passkey } from '@/types/model/passkey';

const userStore = useUserStore();
const api = useApi();

const loading = ref(false);
const passkey = ref<Passkey | null>(null);

const loadPasskey = async () => {
  if (loading.value) return;

  try {
    loading.value = true;

    const { data } = await api.passkey.one();
    passkey.value = data;
  } catch {
    passkey.value = null;
  } finally {
    loading.value = false;
  }
};

const createPasskey = async () => {
  if (loading.value) return;

  loading.value = true;
  await userStore.createPasskey();
  loading.value = false;

  loadPasskey();
};

const deletePasskey = async () => {
  if (loading.value) return;

  loading.value = true;
  await userStore.deletePasskey();
  loading.value = false;

  loadPasskey();
};

loadPasskey();
</script>

<template>
  <div class="p-2 border flex justify-between items-center gap-2">
    <template v-if="passkey">
      <UiText variant="small">
        {{ $t('pages.profile.security.generated_at', { date: formatDate(passkey.created_at) }) }}
      </UiText>

      <UiButton :disabled="loading" variant="destructive" @click="deletePasskey">
        {{ $t('actions.delete') }}
      </UiButton>
    </template>

    <template v-else>
      <UiText variant="small">
        {{ $t('pages.profile.security.not_yet_generated') }}
      </UiText>

      <UiButton :disabled="loading" @click="createPasskey">
        {{ $t('pages.profile.security.create_passkey') }}
      </UiButton>
    </template>
  </div>
</template>
