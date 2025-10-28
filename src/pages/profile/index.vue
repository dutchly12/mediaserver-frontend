<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { computed } from 'vue';

const route = useRoute();
const router = useRouter();
const { t } = useI18n();

const tab = computed({
  get() {
    return route.name?.toString();
  },
  set(name) {
    router.push({ name });
  },
});
const tabs = computed(() =>
  [
    {
      label: 'labels.main',
      value: 'profile-main',
    },
    {
      label: 'labels.password',
      value: 'profile-password',
    },
    {
      label: 'labels.sessions',
      value: 'profile-sessions',
    },
  ].map((tab) => ({
    label: t(tab.label),
    value: tab.value,
  })),
);
</script>

<template>
  <div class="flex flex-col gap-4">
    <Tabs v-model="tab">
      <TabsList>
        <TabsTrigger v-for="tabItem in tabs" :key="tabItem.label" :value="tabItem.value">
          {{ tabItem.label }}
        </TabsTrigger>
      </TabsList>
    </Tabs>

    <div>
      <RouterView />
    </div>
  </div>
</template>
