<script setup lang="ts">
import { useField } from 'vee-validate';
import { UiField, UiInput } from '@/components/ui';

const props = withDefaults(
  defineProps<{
    name: string;
    label?: string;
    placeholder?: string;
    disabled?: boolean;
    type?: 'string' | 'email' | 'password';
  }>(),
  {
    disabled: false,
    type: 'string',
  },
);

const { value, errors } = useField<string>(props.name);
</script>

<template>
  <UiField v-slot="{ field }" :name="props.name" :label="props.label" :errors>
    <UiInput
      v-model="value"
      v-bind="field"
      :placeholder="props.placeholder"
      :disabled="props.disabled"
      :type="props.type"
    />
  </UiField>
</template>
