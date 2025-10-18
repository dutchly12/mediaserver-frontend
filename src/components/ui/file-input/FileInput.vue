<script setup lang="ts">
import { ref, type HTMLAttributes } from 'vue';
import { useI18n } from 'vue-i18n';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const { t } = useI18n();

const props = defineProps<{
  accept?: string;
  class?: HTMLAttributes['class'];
}>();

const emits = defineEmits<{
  change: [file: File | null];
}>();

const fileInputRef = ref<HTMLInputElement | null>(null);
const selectedFileName = ref<string>('');

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0] || null;

  if (file) {
    selectedFileName.value = file.name;
    emits('change', file);
  } else {
    selectedFileName.value = '';
    emits('change', null);
  }
};

const openFileDialog = () => {
  fileInputRef.value?.click();
};
</script>

<template>
  <div :class="cn('flex items-center gap-2', props.class)">
    <input
      ref="fileInputRef"
      type="file"
      :accept="accept"
      class="hidden"
      @change="handleFileChange"
    />
    <Button type="button" @click="openFileDialog">
      {{ t('components.file_input.choose_file') }}
    </Button>
    <span v-if="selectedFileName" class="text-sm text-muted-foreground truncate">
      {{ selectedFileName }}
    </span>
    <span v-else class="text-sm text-muted-foreground">
      {{ t('components.file_input.no_file_chosen') }}
    </span>
  </div>
</template>
