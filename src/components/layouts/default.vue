<script setup lang="ts">
import AppSidebar from '@/components/app/AppSidebar.vue';
import AppHeader from '@/components/app/AppHeader.vue';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
</script>

<template>
  <SidebarProvider>
    <AppSidebar />

    <SidebarInset>
      <div>
        <AppHeader />

        <main class="relative py-8 px-4">
          <slot />
        </main>
      </div>
    </SidebarInset>
  </SidebarProvider>
</template>
