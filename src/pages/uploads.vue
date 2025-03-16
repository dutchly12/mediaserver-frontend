<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useHead } from '@unhead/vue';
import { useStorageStore } from '@/stores/storage.ts';
import { StorageUploadStatus } from '@/types/stores/storage.ts';
import UiText from '@/components/ui/text.vue';
import UiTabs, { type Tab } from '@/components/ui/tabs.vue';
import UploadsUpload, { type UploadsUploadItem } from '@/components/page/uploads/upload.vue';

const { t } = useI18n();
const storageStore = useStorageStore();

const uploads = computed<UploadsUploadItem[]>(() =>
  storageStore.uploads.map((upload) => ({
    id: upload.id,
    title: upload.name,
    uploaded: `${(upload.progress * 100).toFixed(2)}%`,
    status: upload.status,
  })),
);

const tabs = computed<(Tab & { items: UploadsUploadItem[] })[]>(() =>
  [
    {
      name: 'active',
      label: t('labels.active'),
      items: uploads.value.filter((upload) => upload.status !== StorageUploadStatus.UPLOADED),
    },
    {
      name: 'done',
      label: t('labels.done'),
      items: uploads.value.filter((upload) => upload.status === StorageUploadStatus.UPLOADED),
    },
  ].map((tab) => {
    const length = tab.items.length;

    return {
      ...tab,
      label: length ? `${tab.label} (${length})` : tab.label,
    };
  }),
);

useHead(() => ({
  title: t('pages.uploads.meta.title'),
}));
</script>

<template>
  <div class="flex flex-col gap-4">
    <UiText variant="h3" align="center">{{ $t('pages.uploads.title') }}</UiText>

    <UiTabs :tabs>
      <template v-for="tab in tabs" :key="tab.name" #[tab.name]>
        <TransitionGroup
          tag="div"
          move-class="transition transition-duration-500 transition-ease-in-out"
          enter-active-class="transition transition-duration-500 transition-ease-in-out"
          leave-active-class="absolute transition transition-duration-500 transition-ease-in-out"
          enter-from-class="opacity-0 translate-x-[50%]"
          leave-to-class="opacity-0 translate-x-[50%]"
          class="flex flex-col gap-2"
        >
          <UploadsUpload v-for="upload in tab.items" :key="upload.id" :upload />
        </TransitionGroup>
      </template>
    </UiTabs>
  </div>
</template>
