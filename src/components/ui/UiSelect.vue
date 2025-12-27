<script setup lang="ts" generic="T extends AcceptableValue">
import type { AcceptableValue } from 'reka-ui';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export interface UiSelectOption<T extends AcceptableValue = AcceptableValue> {
  label: string;
  value: T;
}

interface UiSelectCommonProps<T extends AcceptableValue> {
  options?: UiSelectOption<T>[];
  name?: string;
  id?: string;
  ariaInvalid?: boolean;
  placeholder?: string;
}

interface UiSelectSingleProps<T extends AcceptableValue> extends UiSelectCommonProps<T> {
  modelValue?: T;
  multiple?: false;
}

interface UiSelectMultipleProps<T extends AcceptableValue> extends UiSelectCommonProps<T> {
  modelValue?: T[];
  multiple: true;
}

type UiSelectProps = UiSelectSingleProps<T> | UiSelectMultipleProps<T>;

const props = defineProps<UiSelectProps>();

const emit = defineEmits<{
  'update:modelValue': [value: UiSelectProps['modelValue']];
}>();
</script>

<template>
  <Select
    :id="props.id"
    :model-value="props.modelValue"
    :name="props.name"
    :aria-invalid="props.ariaInvalid"
    :multiple="props.multiple"
    @update:model-value="emit('update:modelValue', $event as UiSelectProps['modelValue'])"
  >
    <SelectTrigger>
      <SelectValue :placeholder="props.placeholder" />
    </SelectTrigger>

    <SelectContent>
      <SelectGroup>
        <SelectItem
          v-for="option in props.options"
          :key="String(option.value)"
          :value="option.value"
        >
          {{ option.label }}
        </SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
</template>
