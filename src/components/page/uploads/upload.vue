<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { StorageUploadStatus } from '@/types/stores/storage.ts';

export interface UploadsUploadItem {
  id: number;
  title: string;
  uploaded: string;
  status: StorageUploadStatus;
}

const props = defineProps<{ upload: UploadsUploadItem }>();

const { t } = useI18n();

const statusText = computed(() => {
  switch (props.upload.status) {
    case StorageUploadStatus.QUEUED:
      return t('labels.queued');
    case StorageUploadStatus.UPLOADED:
      return t('labels.done');
    case StorageUploadStatus.ERROR:
      return t('labels.error');
    default:
      return props.upload.uploaded;
  }
});
</script>

<template>
  <div
    class="relative w-full h-10 border-1 rounded-2 bg-no-repeat"
    :style="{ 'background-size': `100% ${props.upload.uploaded}` }"
  >
    <div
      class="absolute z-1 left-0 top-0 h-full rounded-inherit bg-gray-3 transition-width transition-duration-300"
      :style="{ width: upload.uploaded }"
    />

    <div class="absolute z-2 w-full p-2 flex">
      {{ upload.title }}

      <div class="ml-auto font-bold">
        {{ statusText }}
      </div>
    </div>
  </div>
</template>
