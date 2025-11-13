import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { useLocalstorageRef } from '@/composables/use-localstorage-ref';
import { useApi } from '@/composables/use-api';
import {
  TokenType,
  type TokensPair,
  type AuthenticationCreationRequest,
} from '@/types/model/authentication';
import type { User } from '@/types/model/user';

export const useUserStore = defineStore('user', () => {
  const api = useApi();

  const accessToken = useLocalstorageRef<string>(TokenType.ACCESS_TOKEN);
  const refreshToken = useLocalstorageRef<string>(TokenType.REFRESH_TOKEN);
  const refreshing = useLocalstorageRef<boolean>('refreshing');
  const user = ref<User>();

  const isAuthorized = computed(() => !!refreshToken.value);

  const updateTokens = (value?: TokensPair) => {
    accessToken.value = value?.access_token || null;
    refreshToken.value = value?.refresh_token || null;
  };

  const loadUser = async () => {
    if (!isAuthorized.value) return;

    const { data } = await api.user.info();
    user.value = data;
  };

  const signIn = async (form: AuthenticationCreationRequest) => {
    const { data } = await api.authentications.create(form);
    updateTokens(data);

    await loadUser();
  };

  const refresh = async () => {
    if (!refreshToken.value || refreshing.value) return;

    refreshing.value = true;
    try {
      const { data } = await api.authentications.refresh({
        refresh_token: refreshToken.value,
      });
      updateTokens(data);
    } catch (e) {
      if (api.isAxiosError(e) && e.response?.status === 401) updateTokens();
    }
    refreshing.value = false;
  };

  const signOut = async () => {
    if (!accessToken.value) return;

    await api.authentications.destroy();
    updateTokens();
  };

  return {
    accessToken,
    refreshToken,
    refreshing,
    user,
    isAuthorized,
    loadUser,
    signIn,
    refresh,
    signOut,
  };
});
