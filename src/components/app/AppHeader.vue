<script setup lang="ts">
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import type { LayoutAction } from '@/types/composables/use-layout';
import Text from '@/components/ui/Text.vue';
import { Button } from '@/components/ui/button';

const props = defineProps<{
  title?: string;
  actions?: LayoutAction[];
}>();
</script>

<template>
  <header class="h-16 p-4 border-b flex items-center gap-2 bg-background">
    <SidebarTrigger class="-ml-1" />

    <Separator orientation="vertical" class="mr-2" />

    <div class="flex-1 flex justify-between items-center">
      <Text variant="h4">
        {{ props.title }}
      </Text>

      <div class="flex items-center gap-2">
        <template v-for="action in props.actions" :key="action.key">
          <RouterLink v-if="action.type === 'link'" :to="action.to">
            <Button size="icon" variant="outline">
              <component :is="action.icon" />
            </Button>
          </RouterLink>

          <Button v-else size="icon" variant="outline">
            <component :is="action.icon" @click="action.callback" />
          </Button>
        </template>
      </div>
    </div>
  </header>
</template>
