<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useLayout } from '@/composables/use-layout';
import { useHead } from '@unhead/vue';
import { useApi } from '@/composables/use-api';
import { parseWebauthnOptions, prepareWebauthnCredential } from '@/lib/webauthn';
import { Button } from '@/components/ui/button';

const { t } = useI18n();
const api = useApi();

const createPasskey = async () => {
  try {
    const { data } = await api.passkeys.options();

    const credential = await navigator.credentials.create({ publicKey: parseWebauthnOptions(data) });
    if (!credential) return;

    // @ts-expect-error typescript DOM's wrong type declaration
    const attestation = prepareWebauthnCredential(credential);

    await api.passkeys.store({ attestation });
  } catch {}
};

useLayout(() => ({
  title: t('pages.profile.security.title'),
}));

useHead(() => ({
  title: t('pages.profile.security.meta.title'),
}));
</script>

<template>
  <div>
    Security section
    <Button @click="createPasskey"> options </Button>
  </div>
</template>
