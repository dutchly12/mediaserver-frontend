<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useLayout } from '@/composables/use-layout';
import { useHead } from '@unhead/vue';
import { useApi } from '@/composables/use-api';
import { Button } from '@/components/ui/button';

const { t } = useI18n();
const api = useApi();

const createPasskey = async () => {
  try {
    const { data: options } = await api.passkey.options();

    const publicKey = PublicKeyCredential.parseCreationOptionsFromJSON(options);
    if (!publicKey) return;

    const attestation = (await navigator.credentials.create({ publicKey })) as PublicKeyCredential;
    if (!attestation) return;

    await api.passkey.store({ attestation: attestation.toJSON() });
  } catch (err) {
    console.error(err);
  }
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
    <Button @click="createPasskey">Create Passkey</Button>
  </div>
</template>
