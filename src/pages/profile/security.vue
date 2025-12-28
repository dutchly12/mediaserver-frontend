<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useHead } from '@unhead/vue';
import { useLayout } from '@/composables/use-layout';
import ProfilePasswordForm from '@/components/profile/ProfilePasswordForm.vue';
import ProfilePasskeyForm from '@/components/profile/ProfilePasskeyForm.vue';

const { t } = useI18n();

useLayout(() => ({
  title: t('pages.profile.security.title'),
}));

useHead(() => ({
  title: t('pages.profile.security.meta.title'),
}));
</script>

<template>
  <div class="max-w-150 flex flex-col gap-4">
    <ProfilePasswordForm />

    <ProfilePasskeyForm />
  </div>
</template>
