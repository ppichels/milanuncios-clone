<script lang="ts" setup>
import { Search } from "lucide-vue-next";

import { useDebounceFn } from "@vueuse/core";

import type { categories, categories as categoriesModel } from "@prisma/client";
import type { States } from "./Modal.vue";
import type { categoryParent } from "~/shared/types";

const props = defineProps<{
  setState: (value: States) => void;
  expandCategory: (categoryId: number | null) => void;
  closeModal: () => void;
  selectCategory: (category: categoryParent | categoriesModel | null) => void;
}>();

const categoriesByTerm = ref<categoriesModel[]>([]);
const searchTerm = ref("");

watch(searchTerm, (value) => searchCategory(value));

const getSearchIndex = (text: string) =>
  text.toLowerCase().indexOf(searchTerm.value.toLowerCase());

const searchCategory = useDebounceFn(async (searchTerm: string) => {
  if (!searchTerm.length) {
    props.setState("category-select");
    return;
  }

  props.setState("searching");
  categoriesByTerm.value = [];

  if (searchTerm.length < 3) return;

  const data = await $fetch(`/api/categories?searchTerm=${searchTerm}`);

  categoriesByTerm.value = data || [];
}, 600);

const handleSelect = (category: categories) => {
  searchTerm.value = "";
  props.expandCategory(category.parent_id);

  if (!category.parent_id) props.selectCategory(category);
};
</script>

<template>
  <div class="relative items-center">
    <Input
      v-model="searchTerm"
      class="pl-10"
      placeholder="Buscar una categoría"
    />
    <span
      class="absolute inset-y-0 start-0 flex items-center justify-center px-3"
    >
      <Search class="size-6 text-muted-foreground" />
    </span>
  </div>

  <button
    v-for="category in categoriesByTerm"
    :key="category.id"
    class="flex w-full gap-3 rounded-md px-3 py-2 hover:bg-slate-100"
    @click="handleSelect(category)"
  >
    <Search class="size-6"></Search>
    <div>
      <span
        v-for="(letter, i) in category.name"
        :key="i"
        :class="{
          'font-bold':
            getSearchIndex(category.name) !== -1 &&
            i >= getSearchIndex(category.name) &&
            i < getSearchIndex(category.name) + searchTerm.length,
        }"
      >
        {{ letter }}
      </span>
    </div>
  </button>
</template>
