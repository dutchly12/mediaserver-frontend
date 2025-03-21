import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import {
  ActiveStorageUploader,
  type ProgressHandlerEvent,
} from '@/utils/active-storage-uploader.ts';
import {
  StorageUploadStatus,
  type StorageUpload,
  type UploadSuccessCallback,
} from '@/types/stores/storage.ts';

export const useStorageStore = defineStore('storage', () => {
  let uploading = false;
  let iteration = 1;

  const uploads = ref<StorageUpload[]>([]);

  const hasActiveUpload = computed(() =>
    uploads.value.some((upload) => upload.status === StorageUploadStatus.UPLOADING),
  );

  const getUploadId = () => iteration++;

  const handleProgressEvent = (id: number, event: ProgressHandlerEvent) => {
    const index = uploads.value.findIndex((upload) => upload.id === id);

    if (index < 0) return;

    const upload = uploads.value[index];

    uploads.value[index] = {
      ...upload,
      ...event,
    };
  };

  const processUpload = async () => {
    const index = uploads.value.findIndex((upload) => upload.status === StorageUploadStatus.QUEUED);

    if (uploading || index < 0) return;

    uploading = true;

    const uploader = new ActiveStorageUploader(uploads.value[index].file, (event) =>
      handleProgressEvent(uploads.value[index].id, event),
    );

    try {
      uploads.value[index].status = StorageUploadStatus.UPLOADING;

      const signed_id = await uploader.upload();

      uploads.value[index].status = StorageUploadStatus.UPLOADED;
      uploads.value[index].callback(signed_id, uploads.value[index].name);
    } catch {
      uploads.value[index].status = StorageUploadStatus.ERROR;
    }

    uploading = false;
    processUpload();
  };

  const upload = (file: File, callback: UploadSuccessCallback) => {
    const { name } = file;
    const id = getUploadId();

    uploads.value.push({
      id,
      name,
      file,
      callback,
      total: 0,
      loaded: 0,
      progress: 0,
      status: StorageUploadStatus.QUEUED,
    });

    processUpload();
  };

  const retry = (id: number) => {
    const index = uploads.value.findIndex((upload) => upload.id === id);

    if (index < 0 || uploads.value[index].status !== StorageUploadStatus.ERROR) return;

    uploads.value[index] = {
      ...uploads.value[index],
      progress: 0,
      status: StorageUploadStatus.QUEUED,
    };

    processUpload();
  };

  return {
    uploads,
    hasActiveUpload,
    upload,
    retry,
  };
});
