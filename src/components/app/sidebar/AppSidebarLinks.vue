<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { Shuffle, TagsIcon, Users } from 'lucide-vue-next';
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

const route = useRoute();
const { t } = useI18n();

const menuItems = computed(() =>
  [
    {
      title: t('labels.people'),
      routeName: 'people',
      icon: Users,
    },
    {
      title: t('labels.tags'),
      routeName: 'tags',
      icon: TagsIcon,
    },
    {
      title: t('labels.random_unviewed_video'),
      routeName: 'videos-random',
      icon: Shuffle,
    },
  ].map((item) => ({
    ...item,
    active: route.name?.toString().startsWith(item.routeName),
  })),
);
</script>

<template>
  <SidebarGroup>
    <SidebarGroupLabel>
      {{ $t('labels.pages') }}
    </SidebarGroupLabel>

    <SidebarGroupContent>
      <SidebarMenu>
        <SidebarMenuItem v-for="item in menuItems" :key="item.routeName">
          <SidebarMenuButton :is-active="item.active" as-child>
            <RouterLink :to="{ name: item.routeName }">
              <component :is="item.icon" />
              <span>{{ item.title }}</span>
            </RouterLink>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroupContent>
  </SidebarGroup>
</template>
