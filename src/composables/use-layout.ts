import { computed, onBeforeUnmount, readonly, ref, watch } from 'vue';
import type { LayoutOptions } from '@/types/composables/use-layout';

const state = ref<LayoutOptions | null>(null);

export const layoutOptions = readonly(state);

export const useLayout = (options: () => LayoutOptions) => {
  const computedOptions = computed(options);

  onBeforeUnmount(() => {
    state.value = null;
  });

  watch(
    computedOptions,
    (value) => {
      state.value = value;
    },
    { immediate: true },
  );
};
