<script lang="ts" setup>
import { Button } from "@/components/ui/button";

import { inject } from "vue";
import { authModalKey } from "~/types/injectKeys";
import type Modal from "~/types/AuthModal";
import { useAuthUser } from "../../composables/useAuthUser";

const { toggleModal } = inject(authModalKey) as Modal;

const user = useAuthUser();
</script>

<template>
  <div class="inline-flex flex-col items-center gap-3">
    <img
      class="ma-SharedVerifiedStatus-image"
      alt="¡Cuenta creada!"
      title="¡Cuenta creada!"
      src="https://scm-milanuncios-frontend-pro.milanuncios.com/statics/images/authentication/register-success.svg"
    />
    <div class="flex flex-col items-center gap-5 text-center">
      <span class="text-[40px] font-bold leading-10"> ¡Cuenta creada! </span>
      <p>
        Te hemos enviado un correo a
        <br />
        <strong v-if="user">{{ user.email }}</strong>
        <br />
        Confirma tu email en un clic para que podamos publicar tu anuncio. Si no
        lo ves, revisa el spam 😉
      </p>
    </div>

    <Button class="w-fit" @click="toggleModal(false)">Entendido </Button>
  </div>
</template>
