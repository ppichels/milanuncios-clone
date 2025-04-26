<script setup lang="ts">
import { PlusSquare } from "lucide-vue-next";

const user = useAuthUser();

const isAuthModalOpen = ref(false);

defineProps<{ userOnly?: boolean }>();
</script>

<template>
  <div class="sticky top-0 flex items-center justify-between p-4">
    <router-link to="/">
      <img
        class="h-10 w-[150px]"
        src="~/assets/images/milanuncios-logo.svg"
        alt=""
      />
    </router-link>

    <div class="flex gap-2">
      <div v-if="!userOnly" class="flex gap-2">
        <Button
          base="link"
          variant="tertiary"
          @click="$router.push('/publicar-anuncios-gratis')"
        >
          <PlusSquare class="!size-6" />
          Vender</Button
        >
      </div>

      <UserDropdown />
      <Button v-if="!user" variant="secondary" @click="isAuthModalOpen = true"
        >Iniciar sesión</Button
      >
    </div>
  </div>

  <AuthModal v-if="isAuthModalOpen" v-model:open="isAuthModalOpen" />
</template>

<style scoped></style>
