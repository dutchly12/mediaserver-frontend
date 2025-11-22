<script setup lang="ts">
import { computed, useId } from 'vue';
import { Field as VeeValidateField } from 'vee-validate';
import { Field, FieldLabel, FieldDescription, FieldError } from '@/components/ui/field';

const props = defineProps<{
  name: string;
  label?: string;
  description?: string;
}>();

const id = useId();

const computedId = computed(() => `${props.name}_${id}`);
</script>

<template>
  <VeeValidateField :name="props.name" v-slot="{ field, errors }">
    <Field :data-invalid="!!errors?.length">
      <FieldLabel v-if="props.label || $slots.label" :for="computedId">
        <slot name="label">
          {{ props.label }}
        </slot>
      </FieldLabel>

      <slot :field="{ ...field, id: computedId, ariaInvalid: !!errors?.length }" />

      <FieldDescription v-if="props.description || $slots.description">
        <slot name="description">
          {{ props.description }}
        </slot>
      </FieldDescription>

      <FieldError v-if="errors" :errors />
    </Field>
  </VeeValidateField>
</template>
