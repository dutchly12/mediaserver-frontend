<script setup lang="ts">
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
</script>

<template>
  <header class="h-16 px-4 border-b flex items-center gap-2 bg-background">
    <SidebarTrigger class="-ml-1" />
    <Separator orientation="vertical" class="mr-2 h-4" />
  </header>
</template>
