<script lang="ts" setup>
import type { categoryParent } from "~/shared/types";

defineProps<{ categories: categoryParent[] | null }>();
</script>

<template>
  <div class="flex snap-x snap-mandatory gap-3 overflow-x-auto">
    <button
      v-for="(category, index) in categories"
      :key="index"
      class="flex w-[100px] shrink-0 snap-start flex-col items-center rounded-lg text-sm font-medium tracking-tight hover:bg-slate-100"
    >
      <img
        class="size-[60px]"
        :src="`https://scm-milanuncios-frontend-pro.milanuncios.com/statics/images/categories/${category.id}.svg`"
        alt=""
      />
      {{ category.name }}
    </button>
  </div>
</template>
