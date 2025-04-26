<script lang="ts" setup>
import { Search } from "lucide-vue-next";
import Input from "~/components/ui/input/Input.vue";

import type { categoryParent } from "~/shared/types";

const isModalOpen = ref<boolean>(false);

const props = defineProps<{
  class?: string;
  selectedCategory: categoryParent | null;
}>();
</script>

<template>
  <div :class="[props.class, 'relative']">
    <Input
      class="h-14 cursor-pointer rounded-full border-0 pl-14 shadow-[0_4px_15px_rgba(0,0,0,.1)]"
      placeholder="Estoy buscando..."
      readonly
      @click.stop="isModalOpen = true"
    />
    <span
      class="absolute inset-y-0 start-0 flex items-center justify-center px-6"
    >
      <Search class="size-6 text-muted-foreground" />
    </span>
  </div>

  <SearchBarMobileModal
    v-model:open="isModalOpen"
    :selected-category="selectedCategory"
  />
</template>
