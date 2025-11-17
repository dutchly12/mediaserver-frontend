<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useHead } from '@unhead/vue';
import { useLayout } from '@/composables/use-layout';
import { useUserStore } from '@/stores/user';
import { Button } from '@/components/ui/button';

const { t } = useI18n();
const userStore = useUserStore();

useLayout(() => ({
  title: t('pages.profile.security.title'),
}));

useHead(() => ({
  title: t('pages.profile.security.meta.title'),
}));
</script>

<template>
  <div>
    <Button @click="userStore.createPasskey">
      {{ $t('pages.profile.security.create_passkey') }}
    </Button>
  </div>
</template>
