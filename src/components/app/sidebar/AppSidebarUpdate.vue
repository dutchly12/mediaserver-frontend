<script setup lang="ts">
import { UiItem } from '@/components/ui';
import { useRegisterSW } from 'virtual:pwa-register/vue';

const { updateServiceWorker } = useRegisterSW();
</script>

<template>
  <UiItem
    :title="$t('meta.new_version')"
    :actions="[{ label: $t('actions.update'), handler: updateServiceWorker }]"
    variant="outline"
  />
</template>
