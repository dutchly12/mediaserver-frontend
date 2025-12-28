<script setup lang="ts">
import { useField } from 'vee-validate';
import { UiField, UiInput } from '@/components/ui';

const props = withDefaults(
  defineProps<{
    name: string;
    label?: string;
    disabled?: boolean;
  }>(),
  {
    disabled: false,
  },
);

const { errors, setValue } = useField<File>(props.name);

const handleChange = (event: Event) => {
  const { files } = event.target as HTMLInputElement;
  const file = files?.[0];

  if (file) setValue(file);
};
</script>

<template>
  <UiField v-slot="{ field }" :name="props.name" :label="props.label" :errors>
    <UiInput v-bind="field" :disabled="props.disabled" type="file" @change="handleChange" />
  </UiField>
</template>
