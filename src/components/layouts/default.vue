<script setup lang="ts">
import AppSidebar from '@/components/app/AppSidebar.vue';
import AppHeader from '@/components/app/AppHeader.vue';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
</script>

<template>
  <SidebarProvider>
    <AppSidebar />

    <SidebarInset>
      <div>
        <AppHeader class="sticky top-0 shrink-0 z-1000" />

        <main class="py-4 px-4">
          <slot />
        </main>
      </div>
    </SidebarInset>
  </SidebarProvider>
</template>
