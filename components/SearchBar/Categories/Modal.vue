<script lang="ts" setup>
import { cn } from "@/lib/utils";
import type { categories as categoriesModel } from "@prisma/client";
import { Check, ChevronLeft, ChevronRight } from "lucide-vue-next";

import type { categoryParent } from "~/shared/types";

const props = defineProps<{
  open: boolean;
  categories: categoryParent[];
  selectedCategory: categoryParent | null;
}>();
const emit = defineEmits(["update:open", "update:selectedCategory"]);

export type States = "searching" | "category-select";

const state = ref<States>("category-select");
const setState = (value: States) => (state.value = value);

const closeModal = () => emit("update:open", false);

function selectCategory(category: categoryParent | categoriesModel | null) {
  emit("update:selectedCategory", category);
  closeModal();
}

const expandedCategory = ref<categoryParent | null>(null);

function getCategoryById(data: categoryParent[], id: number) {
  for (let i = 0; i < data.length; i++) {
    const category = data[i];

    if (category.id == id) {
      return category;
    } else if (category.childrens.length) {
      getCategoryById(category.childrens, id);
    }
  }
}

function expandCategory(categoryId: number | null) {
  if (!categoryId) return;

  expandedCategory.value =
    getCategoryById(props.categories, categoryId) || null;
}
</script>

<template>
  <Dialog
    :open="props.open"
    @update:open="(value: boolean) => emit('update:open', value)"
  >
    <DialogContent
      class="flex h-full flex-col gap-4 overflow-y-auto p-4 max-md:max-w-full md:max-h-[calc(100%-40px)]"
    >
      <div class="mb-3 text-center text-xl font-bold">Categorías</div>

      <SearchBarCategoriesSearch
        v-bind="{
          setState,
          expandCategory,
          closeModal,
          selectCategory,
        }"
      />

      <template v-if="state == 'searching'"> </template>

      <template v-else-if="expandedCategory">
        <button
          class="flex rounded-lg px-2 py-3 hover:bg-slate-100"
          @click="
            expandedCategory ? expandCategory(expandedCategory.parent_id) : null
          "
        >
          <ChevronLeft class="mr-3"></ChevronLeft>
          <span>{{ expandedCategory.name }}</span>
        </button>

        <hr />

        <button
          v-for="(category, index) in expandedCategory.childrens"
          :key="index"
          :class="
            cn(
              'flex items-center justify-between rounded-md p-2 hover:bg-slate-100',
              category.id == selectedCategory?.id && 'bg-slate-100',
            )
          "
          @click="
            category.childrens.length
              ? expandCategory(category.id)
              : selectCategory(category)
          "
        >
          <div class="flex items-center gap-3">
            {{ category.name }}
          </div>

          <Check
            v-if="category.id == selectedCategory?.id"
            class="text-green-600"
          ></Check>
          <ChevronRight v-else-if="category.childrens.length"></ChevronRight>
        </button>
      </template>

      <template v-else>
        <button
          :class="
            cn(
              'flex rounded-lg px-2 py-3 hover:bg-slate-100',
              selectedCategory == null && 'justify-between bg-slate-100',
            )
          "
          @click="selectCategory(null)"
        >
          <span>Todas las categorías</span>
          <Check v-if="selectedCategory == null" class="text-green-600"></Check>
        </button>

        <hr />

        <button
          v-for="(category, index) in categories"
          :key="index"
          class="flex items-center justify-between rounded-lg p-2 hover:bg-slate-100"
          @click="expandCategory(category.id)"
        >
          <div class="flex items-center gap-3">
            <img
              class="size-8"
              :src="`https://scm-milanuncios-frontend-pro.milanuncios.com/statics/images/categories/${category.id}.svg`"
              alt=""
            />
            {{ category.name }}
          </div>

          <ChevronRight></ChevronRight>
        </button>
      </template>
    </DialogContent>
  </Dialog>
</template>
