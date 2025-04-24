<script lang="ts" setup>
import { Search } from "lucide-vue-next";

import Input from "~/components/ui/input/Input.vue";
import Button from "~/components/ui/button/Button.vue";
import type { categoryParent } from "~/shared/types";

const selectedCategory = ref<categoryParent | null>(null);

const isCategoriesModalOpen = ref<boolean>(false);
const categories = await $fetch<categoryParent[]>("/api/categories");
</script>

<template>
  <div
    class="flex h-[72px] w-full items-center rounded-full shadow-[0_4px_15px_rgba(0,0,0,.1)]"
  >
    <div class="flex h-full w-full items-center divide-x divide-slate-300">
      <div class="relative h-full w-full">
        <Input
          class="search-item h-full rounded-l-full border-0 pl-14 shadow-none"
          placeholder="Estoy buscando..."
        />
        <span
          class="absolute inset-y-0 start-0 flex items-center justify-center px-6"
        >
          <Search class="size-6 text-muted-foreground" />
        </span>
      </div>

      <SearchBarDropDown
        class="search-item"
        :text="
          (selectedCategory && selectedCategory.name) || 'Todas las categorias'
        "
        @click="isCategoriesModalOpen = true"
      >
      </SearchBarDropDown>
    </div>

    <Button class="ml-16 mr-2 size-[55px] rounded-full"
      ><Search class="!size-6"
    /></Button>
  </div>

  <SearchBarCategoriesModal
    v-if="categories"
    v-model:selected-category="selectedCategory"
    v-model:open="isCategoriesModalOpen"
    :categories="categories"
  ></SearchBarCategoriesModal>

  <CategoriesCarousel :categories="categories" />
</template>

<style lang="postcss" scoped>
.search-item {
  @apply hover:shadow-[0_4px_15px_rgba(0,0,0,.1)];
}
</style>
