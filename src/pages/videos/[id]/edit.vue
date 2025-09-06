<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useHead } from '@unhead/vue';
import { toast } from 'vue-sonner';
import { useApi } from '@/composables/use-api.ts';
import Text from '@/components/ui/Text.vue';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { Screenshot } from '@/types/model/screenshot.ts';
import type { Tag } from '@/types/model/tag.ts';
import type { Person } from '@/types/model/person.ts';
import type { Video } from '@/types/model/video.ts';

const route = useRoute();
const { t } = useI18n();
const api = useApi();

const loading = ref(false);
const video = ref<Video>();
const screenshots = ref<Screenshot[]>([]);
const tags = ref<Tag[]>([]);
const people = ref<Person[]>([]);
const form = ref<{
  name: string;
  person_ids: string[];
  tag_ids: string[];
}>({
  name: '',
  person_ids: [],
  tag_ids: [],
});

const routeId = computed(() => route.params.id as string);

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

  loading.value = true;
  try {
    await Promise.all([loadVideo(), loadScreenshots(), loadTags(), loadPeople()]);

    if (!video.value) return;

    form.value = {
      name: video.value.name,
      person_ids: video.value.people.map((person) => person.id),
      tag_ids: video.value.tags.map((tag) => tag.id),
    };
  } catch {}
  loading.value = false;
};

const updateVideo = async () => {
  if (loading.value) return;

  loading.value = true;
  try {
    await api.videos.update(routeId.value, { video: form.value });
    toast.success(t('pages.videos.id.edit.notifications.main_info_changed'), {
      closeButton: true,
    });
  } catch {
    toast.error(t('notifications.server_error'), {
      closeButton: true,
    });
  }
  loading.value = false;
};

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

useHead(() => ({
  title: t('pages.videos.id.edit.meta.title'),
}));
</script>

<template>
  <div>
    <Text variant="h2" class="mb-4">
      {{ $t('pages.videos.id.edit.title') }}
    </Text>

    <Tabs default-value="main" unmount-on-hide>
      <TabsList>
        <TabsTrigger v-for="tab in tabs" :key="tab.value" :value="tab.value">
          {{ tab.label }}
        </TabsTrigger>
      </TabsList>

      <TabsContent value="main">
        <Form @submit="updateVideo" class="max-w-[600px]">
          <Card>
            <CardContent class="flex flex-col gap-4">
              <FormField
                v-model="form.name"
                :label="$t('pages.videos.id.edit.form.name.label')"
                name="name"
                v-slot="{ componentField }"
              >
                <FormItem>
                  <FormLabel>
                    {{ $t('pages.videos.id.edit.form.name.label') }}
                  </FormLabel>

                  <FormControl>
                    <Input
                      :placeholder="$t('pages.videos.id.edit.form.name.placeholder')"
                      :disabled="loading"
                      v-bind="componentField"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              </FormField>

              <FormField
                v-model="form.person_ids"
                :label="$t('pages.videos.id.edit.form.people.label')"
                name="people"
                v-slot="{ componentField }"
              >
                <FormItem>
                  <FormLabel>
                    {{ $t('pages.videos.id.edit.form.people.label') }}
                  </FormLabel>

                  <FormControl>
                    <Select multiple v-bind="componentField">
                      <SelectTrigger>
                        <SelectValue
                          :placeholder="$t('pages.videos.id.edit.form.people.placeholder')"
                        />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectGroup>
                          <SelectItem v-for="person in people" :key="person.id" :value="person.id">
                            {{ person.name }}
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              </FormField>

              <FormField
                v-model="form.tag_ids"
                :label="$t('pages.videos.id.edit.form.tags.label')"
                name="tags"
                v-slot="{ componentField }"
              >
                <FormItem>
                  <FormLabel>
                    {{ $t('pages.videos.id.edit.form.tags.label') }}
                  </FormLabel>

                  <FormControl>
                    <Select multiple v-bind="componentField">
                      <SelectTrigger>
                        <SelectValue
                          :placeholder="$t('pages.videos.id.edit.form.tags.placeholder')"
                        />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectGroup>
                          <SelectItem v-for="tag in tags" :key="tag.id" :value="tag.id">
                            {{ tag.name }}
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              </FormField>
            </CardContent>

            <CardFooter>
              <Button :disabled="loading" type="submit">
                {{ $t('pages.videos.id.edit.form.action') }}
              </Button>
            </CardFooter>
          </Card>
        </Form>
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
