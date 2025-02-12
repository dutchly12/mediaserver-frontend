<script setup lang="ts">
import { useHead } from '@unhead/vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

useHead(() => ({
  title: t('pages.authentication.sign_in.meta.title'),
}));
</script>

<template>
  <div>sign-in</div>
</template>
