<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';

export interface Tab {
  name: string;
  label: string;
}

const props = defineProps<{
  tabs: Tab[];
}>();

const active_tab = ref<string>();

onBeforeMount(() => {
  active_tab.value = props.tabs[0]?.name;
});
</script>

<template>
  <div>
    <div class="overflow-x-auto">
      <div class="border-b">
        <button
          v-for="tab in props.tabs"
          :key="tab.name"
          :class="
            tab.name === active_tab
              ? ['border-x', 'border-t', 'border-b-1', 'border-b-white']
              : ['text-blue-500']
          "
          class="mb-[-1px] px-4 py-2 rounded-t-2"
          @click="active_tab = tab.name"
        >
          {{ tab.label }}
        </button>
      </div>
    </div>

    <div class="mt-4">
      <slot :name="active_tab" />
    </div>
  </div>
</template>
