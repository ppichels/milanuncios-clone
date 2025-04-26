<script setup lang="ts">
import type { categoryParent } from "~/shared/types";

const categories = await $fetch<categoryParent[]>("/api/categories");
</script>

<template>
  <div class="flex flex-col gap-6 px-4">
    <p class="mt-36 text-center text-2xl font-extrabold">
      ¿Qué quieres encontrar?
    </p>

    <SearchBar :categories="categories" />

    <CategoriesCarousel :categories="categories" />
  </div>
</template>
