<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { TagsIcon, Users, Shuffle } from 'lucide-vue-next';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
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
      title: t('labels.random_video'),
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
  <Sidebar>
    <SidebarHeader>
      <SidebarGroup>
        <SidebarGroupContent>
          <RouterLink :to="{ name: 'index' }">
            <h1 class="scroll-m-20 text-2xl font-semibold tracking-tight">
              {{ $t('meta.title') }}
            </h1>
          </RouterLink>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarHeader>

    <SidebarContent>
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
    </SidebarContent>

    <SidebarRail />
  </Sidebar>
</template>
