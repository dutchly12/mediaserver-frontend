<script setup lang="ts">
import { useTemplateRef } from 'vue';
import { useApi } from '@/composables/use-api.ts';
import { useStorageStore } from '@/stores/storage.ts';
import UiIcon from '@/components/ui/icon.vue';

const api = useApi();
const storageStore = useStorageStore();

const input = useTemplateRef('input');

const handleClick = () => {
  input.value?.click();
};

const handleUploadEvent = async (file: string, name: string) => {
  try {
    await api.videos.create({ video: { name, file } });
  } catch {}
};

const handleChange = (event: Event) => {
  const { files } = event.target as HTMLInputElement;
  const filesArray = [...(files ?? [])];

  filesArray.forEach((file) => {
    storageStore.upload(file, handleUploadEvent);
  });
};
</script>

<template>
  <div>
    <UiIcon name="cloud-upload" class="size-12 stroke-1.5 cursor-pointer" @click="handleClick" />
    <input
      ref="input"
      type="file"
      multiple
      accept="video/mp4"
      class="hidden"
      @change="handleChange"
    />
  </div>
</template>
