<script setup lang="ts">
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  type ItemMediaVariants,
  ItemTitle,
  type ItemVariants,
} from '@/components/ui/item';
import { UiButton } from '@/components/ui';

interface ItemComponentAction {
  label: string;
  handler?: () => void;
}

const props = defineProps<{
  title?: string;
  description?: string;
  variant?: ItemVariants['variant'];
  mediaVariant?: ItemMediaVariants['variant'];
  actions?: ItemComponentAction[];
}>();
</script>

<template>
  <Item :variant="props.variant">
    <ItemMedia :variant="props.mediaVariant" v-if="$slots.media">
      <slot name="media" />
    </ItemMedia>

    <ItemContent>
      <ItemTitle v-if="props.title || $slots.title">
        <slot name="title">
          {{ props.title }}
        </slot>
      </ItemTitle>

      <ItemDescription v-if="props.description || $slots.description">
        <slot name="description">
          {{ props.description }}
        </slot>
      </ItemDescription>
    </ItemContent>

    <ItemActions v-if="props.actions?.length || $slots.actions">
      <slot name="actions">
        <UiButton v-for="action in props.actions" :key="action.label">
          {{ action.label }}
        </UiButton>
      </slot>
    </ItemActions>
  </Item>
</template>
