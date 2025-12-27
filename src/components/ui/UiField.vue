<script setup lang="ts">
import { computed, useId } from 'vue';
import { Field, FieldLabel, FieldDescription, FieldError } from '@/components/ui/field';

const props = defineProps<{
  name: string;
  label?: string;
  description?: string;
  errors?: string[];
}>();

const id = useId();

const computedId = computed(() => `${props.name}_${id}`);
const hasErrors = computed(() => !!props.errors?.length);
const fieldProps = computed(() => ({
  id: computedId.value,
  ariaInvalid: hasErrors.value,
}));
</script>

<template>
  <Field :data-invalid="hasErrors">
    <FieldLabel v-if="props.label || $slots.label" :for="computedId">
      <slot name="label">
        {{ props.label }}
      </slot>
    </FieldLabel>

    <slot :field="fieldProps" />

    <FieldDescription v-if="props.description || $slots.description">
      <slot name="description">
        {{ props.description }}
      </slot>
    </FieldDescription>

    <FieldError v-if="hasErrors" :errors="props.errors" />
  </Field>
</template>
