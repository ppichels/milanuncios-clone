<script lang="ts" setup>
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const props = defineProps<{
  open: boolean;
  title?: string;
  description?: string;
}>();
const emit = defineEmits(["update:open"]);
</script>

<template>
  <Dialog
    :open="props.open"
    @update:open="(value: boolean) => emit('update:open', value)"
  >
    <DialogContent
      class="flex h-full flex-col max-sm:max-w-none sm:h-fit sm:max-w-[400px]"
    >
      <DialogHeader>
        <slot name="header" />
        <DialogTitle>{{ title }}</DialogTitle>
        <DialogDescription>
          {{ description }}
        </DialogDescription>
      </DialogHeader>

      <slot />
    </DialogContent>
  </Dialog>
</template>
