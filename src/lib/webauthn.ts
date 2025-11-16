import type { PasskeyCreateOptions, PasskeyCreateRequestData } from '@/types/model/passkey';

const base64urlToBuffer = (base64url: string): ArrayBuffer => {
  const padding = '='.repeat((4 - (base64url.length % 4)) % 4);
  const base64 = (base64url + padding).replace(/-/g, '+').replace(/_/g, '/');

  const raw = atob(base64);
  const buffer = new Uint8Array(raw.length);
  for (let i = 0; i < raw.length; ++i) {
    buffer[i] = raw.charCodeAt(i);
  }
  return buffer.buffer;
};

const bufferToBase64url = (buffer: ArrayBuffer): string => {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (const b of bytes) binary += String.fromCharCode(b);

  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
};

export const parseWebauthnOptions = (
  options: PasskeyCreateOptions,
): PublicKeyCredentialCreationOptions => {
  const optionsCopy = structuredClone(options);

  return {
    ...optionsCopy,
    challenge: base64urlToBuffer(optionsCopy.challenge),
    user: {
      ...optionsCopy.user,
      id: new TextEncoder().encode(optionsCopy.user.id),
    },
  };
};

export const prepareWebauthnCredential = (
  credential: PublicKeyCredential,
): PasskeyCreateRequestData['attestation'] => ({
  id: credential.id,
  rawId: bufferToBase64url(credential.rawId),
  type: credential.type,
  response: {
    // @ts-expect-error typescript's DOM library don't know about `attestationObject` property
    attestationObject: bufferToBase64url(credential.response.attestationObject),
    clientDataJSON: bufferToBase64url(credential.response.clientDataJSON),
  },
});
