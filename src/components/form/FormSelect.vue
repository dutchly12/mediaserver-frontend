<script setup lang="ts">
import { useField } from 'vee-validate';
import { UiField, UiSelect, type UiSelectOption } from '@/components/ui';
import type { AcceptableValue } from 'reka-ui';

const props = withDefaults(
  defineProps<{
    name: string;
    options?: UiSelectOption[];
    label?: string;
    placeholder?: string;
    disabled?: boolean;
    multiple?: boolean;
  }>(),
  {
    disabled: false,
    multiple: false,
  },
);

const { value: multipleValue, errors } = useField<AcceptableValue[]>(props.name);

const { value: singleValue } = useField<AcceptableValue>(props.name);
</script>

<template>
  <UiField v-slot="{ field }" :name="props.name" :label="props.label" :errors>
    <UiSelect
      v-if="props.multiple"
      v-model="multipleValue"
      v-bind="field"
      :options="props.options"
      :placeholder="props.placeholder"
      :disabled="props.disabled"
      multiple
    />

    <UiSelect
      v-else
      v-model="singleValue"
      v-bind="field"
      :options="props.options"
      :placeholder="props.placeholder"
      :disabled="props.disabled"
    />
  </UiField>
</template>
