<script setup lang="ts">
const user = useAuthUser();

const isAuthModalOpen = ref(false);
</script>

<template>
  <div class="flex justify-between items-center p-4">
    <img
      class="h-10 w-[150px]"
      src="~/assets/images/milanuncios-logo.svg"
      alt=""
    />

    <div class="flex gap-2">
      <UserDropdown />

      <Button v-if="!user" variant="secondary" @click="isAuthModalOpen = true"
        >Iniciar sesión</Button
      >
    </div>
  </div>

  <AuthModal v-if="isAuthModalOpen" v-model:open="isAuthModalOpen" />
</template>

<style scoped></style>
