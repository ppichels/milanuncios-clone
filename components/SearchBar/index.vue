<script lang="ts" setup>
import { provide } from "vue";
import { categoriesModalKey } from "~/types/injectKeys";

import type { categoryParent } from "~/shared/types";

provide(categoriesModalKey, { toggleModal });

function toggleModal(value: boolean) {
  isCategoriesModalOpen.value = value;
}

const selectedCategory = ref<categoryParent | null>(null);

const isCategoriesModalOpen = ref<boolean>(false);
const categories = await $fetch<categoryParent[]>("/api/categories");
</script>

<template>
  <SearchBarDesktop
    v-model:selected-category="selectedCategory"
    class="hidden md:block"
  />

  <SearchBarMobile
    v-model:selected-category="selectedCategory"
    class="md:!hidden"
  ></SearchBarMobile>

  <SearchBarCategoriesModal
    v-model:selected-category="selectedCategory"
    v-model:open="isCategoriesModalOpen"
    :categories="categories"
  ></SearchBarCategoriesModal>

  <CategoriesCarousel :categories="categories" />
</template>
