<script setup lang="ts">
import { useRegisterSW } from 'virtual:pwa-register/vue';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar';
import AppSidebarUser from '@/components/app/sidebar/AppSidebarUser.vue';
import AppSidebarLinks from '@/components/app/sidebar/AppSidebarLinks.vue';
import AppSidebarUpdate from '@/components/app/sidebar/AppSidebarUpdate.vue';

const { needRefresh: needRefreshServiceWorker } = useRegisterSW();
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
      <AppSidebarLinks />
    </SidebarContent>

    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem v-if="needRefreshServiceWorker">
          <AppSidebarUpdate />
        </SidebarMenuItem>

        <SidebarMenuItem>
          <AppSidebarUser />
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>

    <SidebarRail />
  </Sidebar>
</template>
