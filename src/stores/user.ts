import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { useApi } from '@/composables/use-api';
import {
  TokenType,
  type TokensPair,
  type AuthenticationCreationRequest,
} from '@/types/model/authentication';
import type { User } from '@/types/model/user';

export const useUserStore = defineStore('user', () => {
  const api = useApi();

  const user = ref<User>();

  const tokens = ref<Record<TokenType, string | null>>({
    access_token: localStorage.getItem(TokenType.ACCESS_TOKEN),
    refresh_token: localStorage.getItem(TokenType.REFRESH_TOKEN),
  });

  const isAuthorized = computed(() => !!tokens.value.refresh_token);

  const updateTokens = (value?: TokensPair) => {
    if (value) {
      localStorage.setItem(TokenType.ACCESS_TOKEN, value.access_token);
      localStorage.setItem(TokenType.REFRESH_TOKEN, value.refresh_token);
      tokens.value = value;
    } else {
      localStorage.removeItem(TokenType.ACCESS_TOKEN);
      localStorage.removeItem(TokenType.REFRESH_TOKEN);
      tokens.value = { access_token: null, refresh_token: null };
    }
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
    if (!tokens.value.refresh_token) return;

    try {
      const { data } = await api.authentications.refresh({
        refresh_token: tokens.value.refresh_token,
      });
      updateTokens(data);
    } catch (e) {
      if (api.isAxiosError(e) && e.response?.status === 401) updateTokens();
    }
  };

  const signOut = async () => {
    if (!tokens.value.access_token) return;

    await api.authentications.destroy();
    updateTokens();
  };

  return {
    user,
    tokens,
    isAuthorized,
    loadUser,
    signIn,
    refresh,
    signOut,
  };
});
