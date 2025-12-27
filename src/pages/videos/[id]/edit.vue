<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useHead } from '@unhead/vue';
import { toast } from 'vue-sonner';
import * as z from 'zod';
import { useLayout } from '@/composables/use-layout';
import { useApi } from '@/composables/use-api';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import type { Screenshot } from '@/types/model/screenshot';
import type { Tag } from '@/types/model/tag';
import type { Person } from '@/types/model/person';
import type { Video } from '@/types/model/video';
import { UiButton, type UiSelectOption } from '@/components/ui';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { FormInput, FormSelect } from '@/components/form';

const validationScheme = z.object({
  name: z.string(),
  person_ids: z.array(z.string()),
  tag_ids: z.array(z.string()),
});

const route = useRoute();
const { t } = useI18n();
const api = useApi();
const form = useForm({
  validationSchema: toTypedSchema(validationScheme),
  initialValues: {
    name: '',
    person_ids: [],
    tag_ids: [],
  },
  keepValuesOnUnmount: true,
});

const loading = ref(false);
const video = ref<Video>();
const screenshots = ref<Screenshot[]>([]);
const tags = ref<Tag[]>([]);
const people = ref<Person[]>([]);

const routeId = computed(() => route.params.id as string);
const peopleOptions = computed<UiSelectOption[]>(() =>
  people.value.map((person) => ({
    label: person.name,
    value: person.id,
  })),
);
const tagsOptions = computed<UiSelectOption[]>(() =>
  tags.value.map((tag) => ({
    label: tag.name,
    value: tag.id,
  })),
);

const tabs = computed(() => [
  {
    label: t('pages.videos.id.edit.tabs.main'),
    value: 'main',
  },
  {
    label: t('pages.videos.id.edit.tabs.preview'),
    value: 'preview',
  },
]);

const loadVideo = async () => {
  const { data } = await api.videos.one(routeId.value);
  video.value = data;
};

const loadScreenshots = async () => {
  const { data } = await api.videos.screenshots(routeId.value);
  screenshots.value = data;
};

const loadTags = async () => {
  const { data } = await api.tags.list();
  tags.value = data;
};

const loadPeople = async () => {
  const { data } = await api.people.list();
  people.value = data;
};

const init = async () => {
  if (loading.value) return;

  try {
    loading.value = true;

    await Promise.all([loadVideo(), loadScreenshots(), loadTags(), loadPeople()]);

    if (!video.value) return;

    console.log(JSON.parse(JSON.stringify(video.value)));

    form.setValues({
      name: video.value.name,
      person_ids: video.value.people.map((person) => person.id),
      tag_ids: video.value.tags.map((tag) => tag.id),
    });

    console.log(form.values);
  } catch {
  } finally {
    loading.value = false;
  }
};

const updateVideo = form.handleSubmit(async (video) => {
  if (loading.value) return;

  try {
    loading.value = true;

    await api.videos.update(routeId.value, { video });

    toast.success(t('pages.videos.id.edit.notifications.main_info_changed'), {
      closeButton: true,
    });
  } catch {
    toast.error(t('notifications.server_error'), {
      closeButton: true,
    });
  } finally {
    loading.value = false;
  }
});

const updatePreview = async (screenshot: Screenshot) => {
  if (screenshot.main) return;

  loading.value = true;
  try {
    const { data } = await api.videos.update_preview(routeId.value, { preview_id: screenshot.id });
    screenshots.value = data;
    toast.success(t('pages.videos.id.edit.notifications.preview_updated'), {
      closeButton: true,
    });
  } catch {
    toast.error(t('notifications.server_error'), {
      closeButton: true,
    });
  }
  loading.value = false;
};

init();

useLayout(() => ({
  title: t('pages.videos.id.edit.title'),
}));

useHead(() => ({
  title: t('pages.videos.id.edit.meta.title'),
}));
</script>

<template>
  <div>
    <Tabs default-value="main" unmount-on-hide>
      <TabsList>
        <TabsTrigger v-for="tab in tabs" :key="tab.value" :value="tab.value">
          {{ tab.label }}
        </TabsTrigger>
      </TabsList>

      <TabsContent value="main">
        <form class="max-w-150" @submit="updateVideo">
          <Card>
            <CardContent class="flex flex-col gap-4">
              <FormInput
                name="name"
                :label="$t('pages.videos.id.edit.form.name.label')"
                :placeholder="$t('pages.videos.id.edit.form.name.placeholder')"
                :disabled="loading"
              />

              <FormSelect
                name="person_ids"
                :label="$t('pages.videos.id.edit.form.people.label')"
                :placeholder="$t('pages.videos.id.edit.form.people.placeholder')"
                :options="peopleOptions"
                :disabled="loading"
                multiple
              />

              <FormSelect
                name="tag_ids"
                :label="$t('pages.videos.id.edit.form.tags.label')"
                :placeholder="$t('pages.videos.id.edit.form.tags.placeholder')"
                :options="tagsOptions"
                :disabled="loading"
                multiple
              />
            </CardContent>

            <CardFooter>
              <UiButton :disabled="loading" type="submit">
                {{ $t('pages.videos.id.edit.form.action') }}
              </UiButton>
            </CardFooter>
          </Card>
        </form>
      </TabsContent>

      <TabsContent value="preview">
        <Card>
          <CardContent>
            <div class="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
              <img
                v-for="screenshot in screenshots"
                :key="screenshot.id"
                :src="screenshot.url"
                :alt="`screenshot-${screenshot.id}`"
                :class="[
                  'rounded',
                  'cursor-pointer',
                  'transition-opacity',
                  screenshot.main ? 'border border-gray-500' : 'opacity-25 hover:opacity-100',
                ]"
                @click="updatePreview(screenshot)"
              />
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  </div>
</template>
