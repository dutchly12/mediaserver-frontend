<script setup lang="ts">
import { useApi } from '@/composables/use-api';
import { KeySquare } from 'lucide-vue-next';
import { Button } from '@/components/ui/button';

const api = useApi();

const signInWithPasskey = async () => {
  const { data: options } = await api.authentications.passkey.options();

  const publicKey = PublicKeyCredential.parseRequestOptionsFromJSON(options);

  const credential = (await navigator.credentials.get({ publicKey })) as PublicKeyCredential;

  if (!credential) return;

  await api.authentications.passkey.create({
    assertion: credential.toJSON(),
    challenge: options.challenge,
  });
};
</script>

<template>
  <Button variant="outline" @click="signInWithPasskey">
    <KeySquare />
    Sign in with Passkey
  </Button>
</template>
