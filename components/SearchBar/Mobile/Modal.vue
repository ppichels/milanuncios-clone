<script lang="ts" setup>
import { Search } from "lucide-vue-next";

import type { categoryParent } from "~/shared/types";
import type CategoriesModal from "~/types/CategoriesModal";

import { categoriesModalKey } from "~/types/injectKeys";

defineProps<{
  open: boolean;
  selectedCategory: categoryParent | null;
}>();
defineEmits(["update:open"]);

const { toggleModal } = inject(categoriesModalKey) as CategoriesModal;

const isSearchModalOpen = ref<boolean>(false);
</script>

<template>
  <Dialog
    :open="open"
    @update:open="(value: boolean) => $emit('update:open', value)"
  >
    <DialogContent class="flex h-full max-w-none flex-col !rounded-none">
      <div class="mb-3 text-lg font-bold">¿Qué quieres encontrar?</div>

      <div class="flex flex-col gap-3">
        <div class="relative">
          <Input
            class="pl-12"
            placeholder="Estoy buscando..."
            readonly
            @click.stop="isSearchModalOpen = true"
          />
          <span
            class="absolute inset-y-0 start-0 flex items-center justify-center px-4"
          >
            <Search class="size-6 text-muted-foreground" />
          </span>
        </div>
      </div>

      <div @click="toggleModal(true)">
        <DropDown
          placeholder="Todas las categorías"
          :model-value="selectedCategory?.name"
        ></DropDown>
      </div>

      <Button>Buscar</Button>
    </DialogContent>
  </Dialog>
</template>
