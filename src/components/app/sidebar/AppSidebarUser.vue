<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useColorMode, type BasicColorSchema } from '@vueuse/core';
import { Check, ChevronsUpDown, User2 } from 'lucide-vue-next';
import { useUserStore } from '@/stores/user';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SidebarMenuButton, useSidebar } from '@/components/ui/sidebar';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

const router = useRouter();
const { t } = useI18n();
const { store: colorMode } = useColorMode();
const userStore = useUserStore();
const { isMobile } = useSidebar();

const loading = ref(false);

const colorModes = computed(() => {
  const modes: BasicColorSchema[] = ['auto', 'light', 'dark'];

  return modes.map((value) => ({
    value,
    label: t(`labels.${value}`),
    active: colorMode.value === value,
  }));
});

const changeColorMode = (value: BasicColorSchema) => {
  colorMode.value = value;
};

const handleSignOutClick = async () => {
  if (loading.value) return;

  loading.value = true;
  try {
    await userStore.signOut();
    await router.push({ name: 'authentication-sign-in' });
  } catch {}
  loading.value = false;
};
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <SidebarMenuButton>
        <User2 />
        {{ userStore.user?.email }}
        <ChevronsUpDown class="ml-auto" />
      </SidebarMenuButton>
    </DropdownMenuTrigger>

    <DropdownMenuContent :side="isMobile ? 'bottom' : 'right'" class="w-[15rem]">
      <DropdownMenuItem as-child>
        <div class="flex justify-between items-center">
          <Label as-child for="only-viewed-viewed-switch">
            {{ $t('labels.only_unviewed_videos') }}
          </Label>
          <Switch v-model="userStore.onlyUnviewedVideos" id="only-viewed-viewed-switch" />
        </div>
      </DropdownMenuItem>

      <DropdownMenuItem as-child>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            {{ $t('labels.color_scheme') }}
          </DropdownMenuSubTrigger>

          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem
                v-for="mode in colorModes"
                :key="mode.value"
                @click="() => changeColorMode(mode.value)"
              >
                {{ mode.label }}

                <Check v-if="mode.active" class="ml-auto" />
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
      </DropdownMenuItem>

      <DropdownMenuItem as-child>
        <RouterLink :to="{ name: 'profile' }">
          {{ $t('labels.profile') }}
        </RouterLink>
      </DropdownMenuItem>

      <DropdownMenuSeparator />

      <DropdownMenuItem variant="destructive" @click="handleSignOutClick">
        {{ $t('actions.sign_out') }}
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
