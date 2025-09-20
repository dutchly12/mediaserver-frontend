import { computed, onBeforeUnmount, ref, watch } from 'vue';
import type { LayoutOptions } from '@/types/composables/use-layout';

export const layoutOptions = ref<LayoutOptions | null>(null);

export const useLayout = (options: () => LayoutOptions) => {
  const computedOptions = computed(options);

  onBeforeUnmount(() => {
    layoutOptions.value = null;
  });

  watch(
    computedOptions,
    (value) => {
      layoutOptions.value = value;
    },
    { immediate: true },
  );
};
