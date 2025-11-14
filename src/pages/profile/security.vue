<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useLayout } from '@/composables/use-layout';
import { useHead } from '@unhead/vue';

const { t } = useI18n();

useLayout(() => ({
  title: t('pages.profile.security.title'),
}));

useHead(() => ({
  title: t('pages.profile.security.meta.title'),
}));
</script>

<template>
  <div>Security section</div>
</template>
