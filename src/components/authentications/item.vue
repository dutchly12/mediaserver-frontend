<script setup lang="ts">
import { Smartphone, TvMinimal } from 'lucide-vue-next';
import {
  type Authentication,
  AuthenticationStatus,
  AuthenticationUserAgentType,
} from '@/types/model/authentication';
import { computed } from 'vue';
import { formatRelativeTime } from '@/lib/formatters';

const props = defineProps<{
  authentication: Authentication;
}>();

const iconComponent = computed(() =>
  props.authentication.user_agent.type === AuthenticationUserAgentType.mobile
    ? Smartphone
    : TvMinimal,
);
const isActive = computed(() => props.authentication.status === AuthenticationStatus.active);
</script>

<template>
  <section class="p-4 rounded-2xl border grid grid-cols-1 gap-4 md:grid-cols-[10rem_12rem_auto]">
    <div class="flex items-center gap-4">
      <div class="flex items-center gap-2">
        <component :is="iconComponent" />

        <span class="font-medium">{{ props.authentication.user_agent.browser_name }}</span>
        &bullet;
        <span>v{{ props.authentication.user_agent.browser_version }}</span>
      </div>
    </div>

    <div class="flex flex-col gap-1 text-sm">
      <div>
        <span>{{ $t('pages.profile.sessions.active') }}: </span>
        <span>{{ formatRelativeTime(props.authentication.last_active_at, $i18n.locale) }}</span>
      </div>
      <div>
        <span>{{ $t('pages.profile.sessions.created') }}: </span>
        <span>{{ formatRelativeTime(props.authentication.created_at, $i18n.locale) }}</span>
      </div>
    </div>

    <div
      :class="[
        'flex',
        'items-center',
        'gap-2',
        'text-sm',
        'md:justify-end',
        isActive ? 'text-green-700' : 'text-gray-700',
      ]"
    >
      <span>
        {{ $t(`pages.profile.sessions.statuses.${props.authentication.status}`) }}
      </span>

      <div :class="['size-2', 'rounded-full', isActive ? 'bg-green-700' : 'bg-gray-700']" />
    </div>
  </section>
</template>
