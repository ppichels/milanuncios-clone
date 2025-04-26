<script lang="ts" setup>
import { Button } from "@/components/ui/button";

import { Mail } from "lucide-vue-next";
import { inject } from "vue";
import { authModalKey } from "~/types/injectKeys";
import type Modal from "~/types/AuthModal";

const { changeView } = inject(authModalKey) as Modal;
</script>

<template>
  <div class="inline-flex flex-col items-center gap-3">
    <img
      class="h-[200px] w-[200px]"
      src="https://scm-milanuncios-frontend-pro.milanuncios.com/statics/images/authentication/main.svg"
      alt=""
    />
    <div class="flex flex-col items-center gap-5 text-center">
      <span class="font-bold"> Entra a tu cuenta </span>
      <p>
        Inicia sesión para comprar y vender más rápido, chatear desde cualquier
        lugar y guardar tus búsquedas.
      </p>
    </div>

    <div class="mt-3 flex w-full flex-col gap-5">
      <!-- <Button size="lg" variant="secondary">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M21.246 10.261h-8.158a.65.65 0 0 0-.651.651v2.608c0 .36.291.651.65.651h4.596a6.125 6.125 0 0 1-2.638 3.092l1.957 3.392C20.142 18.84 22 15.65 22 12.081c0-.51-.039-.873-.111-1.28a.66.66 0 0 0-.643-.54Z"
                    fill="#0086F8"
                  ></path>
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M12 18.086a6.085 6.085 0 0 1-5.263-3.045l-3.392 1.953A9.984 9.984 0 0 0 12 22a9.985 9.985 0 0 0 5.002-1.34v-.005l-1.957-3.392c-.9.523-1.936.823-3.045.823Z"
                    fill="#00A94B"
                  ></path>
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M16.998 20.66v-.005l-1.957-3.392a6.05 6.05 0 0 1-3.041.823V22a9.956 9.956 0 0 0 4.998-1.34Z"
                    fill="#00A94B"
                  ></path>
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M5.914 12c0-1.11.304-2.146.823-3.04L3.345 7.005A9.877 9.877 0 0 0 2 12c0 1.82.488 3.525 1.345 4.994l3.392-1.953A6.007 6.007 0 0 1 5.914 12Z"
                    fill="#FFBE00"
                  ></path>
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M12 5.914a6.06 6.06 0 0 1 3.863 1.388.65.65 0 0 0 .874-.039l1.846-1.845a.656.656 0 0 0-.04-.96A9.938 9.938 0 0 0 12 2a9.984 9.984 0 0 0-8.655 5.006L6.737 8.96A6.085 6.085 0 0 1 12 5.914Z"
                    fill="#FF3F31"
                  ></path>
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M15.863 7.302a.65.65 0 0 0 .874-.039l1.845-1.845a.656.656 0 0 0-.038-.96A9.938 9.938 0 0 0 12 2v3.914c1.465 0 2.814.519 3.863 1.388Z"
                    fill="#FF3F31"
                  ></path>
                </svg>
                Continuar con Google</Button
              > -->
      <Button size="lg" @click="changeView('email-auth')"
        ><Mail class="!h-5 !w-5" />
        <span class="font-bold"> Continuar con email </span>
      </Button>
    </div>

    <div class="flex items-center gap-1 font-bold">
      <p>¿No tienes cuenta?</p>
      <Button
        class="p-0"
        variant="link"
        @click="changeView('email-auth', 'signin')"
      >
        <span class="font-bold"> Crear cuenta </span>
      </Button>
    </div>
  </div>
</template>
