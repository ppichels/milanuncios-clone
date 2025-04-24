<script lang="ts" setup>
const props = defineProps<{ open: boolean }>();
const emit = defineEmits(["update:open"]);
</script>

<template>
  <Dialog
    :open="props.open"
    @update:open="(value: boolean) => emit('update:open', value)"
  >
    <DialogContent class="flex h-full max-w-none flex-col">
      <slot />
    </DialogContent>
  </Dialog>
</template>
