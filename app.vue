<script setup lang="ts">
import Toaster from "@/components/ui/toast/Toaster.vue";
</script>

<template>
  <ClientOnly>
    <Toaster />
  </ClientOnly>

  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
