<script setup lang="ts">
import { layoutOptions } from '@/composables/use-layout';
import AppSidebar from '@/components/app/AppSidebar.vue';
import AppHeader from '@/components/app/AppHeader.vue';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
</script>

<template>
  <SidebarProvider>
    <AppSidebar class="z-2000" />

    <SidebarInset>
      <div>
        <AppHeader
          :title="layoutOptions?.title"
          :actions="layoutOptions?.actions"
          class="z-1000 sticky top-0 shrink-0"
        />

        <main class="py-4 px-4">
          <slot />
        </main>
      </div>
    </SidebarInset>
  </SidebarProvider>
</template>
