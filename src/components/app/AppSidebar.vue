<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { TagsIcon, Users, User2, ChevronUp, Shuffle } from 'lucide-vue-next';
import { useRegisterSW } from 'virtual:pwa-register/vue';
import { useUserStore } from '@/stores/user';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { UiItem } from '@/components/ui';

const route = useRoute();
const router = useRouter();
const { t } = useI18n();
const { needRefresh: needRefreshServiceWorker, updateServiceWorker } = useRegisterSW();
const userStore = useUserStore();

const loading = ref(false);

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

const handleSignOutClick = async () => {
  if (loading.value) return;

  loading.value = true;
  try {
    await userStore.signOut();
    await router.push({ name: 'authentication-sign-in' });
  } catch {}
  loading.value = false;
};
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

    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem v-if="needRefreshServiceWorker">
          <UiItem
            :title="$t('meta.new_version')"
            :actions="[{ label: $t('actions.update'), handler: updateServiceWorker }]"
            variant="outline"
          />
        </SidebarMenuItem>

        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton>
                <User2 />
                {{ userStore.user?.email }}
                <ChevronUp class="ml-auto" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="top" class="w-[15rem]">
              <DropdownMenuItem as-child>
                <div class="flex justify-between items-center">
                  <Label for="only-viewed-viewed-switch">
                    {{ $t('labels.only_unviewed_videos') }}
                  </Label>
                  <Switch v-model="userStore.onlyUnviewedVideos" id="only-viewed-viewed-switch" />
                </div>
              </DropdownMenuItem>

              <DropdownMenuItem as-child>
                <RouterLink :to="{ name: 'profile' }">
                  <span>{{ $t('labels.profile') }}</span>
                </RouterLink>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem variant="destructive" @click="handleSignOutClick">
                <span>{{ $t('actions.sign_out') }}</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>

    <SidebarRail />
  </Sidebar>
</template>
