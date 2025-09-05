<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useHead } from '@unhead/vue';
import { toast } from 'vue-sonner'
import { useApi } from '@/composables/use-api.ts';
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
import Text from '@/components/ui/Text.vue';
import type { Screenshot } from '@/types/model/screenshot.ts';

const route = useRoute();
const { t } = useI18n();
const api = useApi();

const loading = ref(false);
const screenshots = ref<Screenshot[]>([]);
const form = ref({
  name: '',
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

  form.value = {
    name: data.name,
  };
};

const loadScreenshots = async () => {
  const { data } = await api.videos.screenshots(routeId.value);

  screenshots.value = data;
};

const init = async () => {
  if (loading.value) return;

  loading.value = true;
  try {
    await Promise.all([loadVideo(), loadScreenshots()]);
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
    })
  } catch {
    toast.error(t('notifications.server_error'), {
      closeButton: true,
    })
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
    })
  } catch {
    toast.error(t('notifications.server_error'), {
      closeButton: true,
    })
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
        <Form @submit="updateVideo">
          <Card>
            <CardContent>
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
