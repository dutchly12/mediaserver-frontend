<script setup lang="ts">
import { computed, useId } from 'vue';
import UiText from '@/components/ui/text.vue';

const props = withDefaults(
  defineProps<{
    name: string;
    label?: string;
    placeholder?: string;
    type?: 'text' | 'number' | 'password' | 'email';
    disabled?: boolean;
  }>(),
  {
    type: 'text',
    disabled: false,
  },
);

const model = defineModel<string | number>({ required: true });

const id = useId();

const computedId = computed(() => `${props.name}_${id}`);
</script>

<template>
  <div class="flex flex-col gap-1">
    <UiText v-if="props.label" tag="label" :for="computedId" class="cursor-pointer">
      {{ props.label }}
    </UiText>

    <input
      v-model="model"
      :name="props.name"
      :id="computedId"
      :placeholder="props.placeholder"
      :type="props.type"
      :disabled="props.disabled"
      class="px-3 py-1.5 font-base leading-6 font-normal border-1 border-solid border-gray-400 rounded-1.5"
    />
  </div>
</template>
