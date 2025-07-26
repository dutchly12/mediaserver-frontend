<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { formattedSize } from '@/utils/formatters.ts';
import UiIcon from '@/components/ui/icon.vue';
import { StorageUploadStatus } from '@/types/stores/storage.ts';

export interface UploadsUploadItem {
  id: number;
  title: string;
  total: number;
  loaded: number;
  progress: number;
  status: StorageUploadStatus;
}

const props = defineProps<{ upload: UploadsUploadItem }>();

const emits = defineEmits<{
  retry: [value: void];
}>();

const { t } = useI18n();

const formattedProgress = computed(() => `${(props.upload.progress * 100).toFixed(2)}%`);
const progressText = computed(() => {
  switch (props.upload.status) {
    case StorageUploadStatus.UPLOADING:
      return props.upload.loaded
        ? `${formattedSize(props.upload.loaded)}/${formattedSize(props.upload.total)}`
        : null;
    case StorageUploadStatus.UPLOADED:
      return formattedSize(props.upload.total);
    default:
      return null;
  }
});

const statusText = computed(() => {
  switch (props.upload.status) {
    case StorageUploadStatus.QUEUED:
      return t('labels.queued');
    case StorageUploadStatus.UPLOADED:
      return t('labels.done');
    case StorageUploadStatus.ERROR:
      return t('labels.error');
    default:
      return formattedProgress.value;
  }
});

const isErrorStatus = computed(() => props.upload.status === StorageUploadStatus.ERROR);
</script>

<template>
  <div
    class="relative w-full h-10 border-1 rounded-2 bg-no-repeat"
    :style="{ 'background-size': `100% ${formattedProgress}` }"
  >
    <div
      class="absolute z-1 left-0 top-0 h-full rounded-inherit bg-gray-3 transition-width transition-duration-300"
      :style="{ width: formattedProgress }"
    />

    <div class="absolute z-2 w-full p-2 flex">
      {{ upload.title }}

      <div class="ml-auto flex items-center gap-2 font-bold tabular-nums cursor-pointer">
        <UiIcon
          v-if="isErrorStatus"
          name="rotate-clockwise"
          class="size-4"
          @click="() => emits('retry')"
        />

        <span>
          <template v-if="progressText">
            {{ progressText }}
            -
          </template>

          {{ statusText }}
        </span>
      </div>
    </div>
  </div>
</template>
