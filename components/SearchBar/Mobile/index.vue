<script lang="ts" setup>
import { Search } from "lucide-vue-next";
import Input from "~/components/ui/input/Input.vue";

const isModalOpen = ref<boolean>(false);
</script>

<template>
  <div class="relative w-full items-center divide-x rounded-full">
    <Input
      class="h-14 border-0 pl-14 shadow-[0_4px_15px_rgba(0,0,0,.1)]"
      placeholder="Estoy buscando..."
      @click.prevent="isModalOpen = true"
    />
    <span
      class="absolute inset-y-0 start-0 flex items-center justify-center px-6"
    >
      <Search class="size-6 text-muted-foreground" />
    </span>
  </div>

  <SearchBarModal v-model:open="isModalOpen" />
</template>
