<script lang="ts" setup>
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import { ChevronDown, ChevronUp } from "lucide-vue-next";

const user = useAuthUser();
const { logout } = useAuth();

const menuOpen = ref<boolean>(false);
</script>

<template>
  <Popover v-if="user" v-model:open="menuOpen">
    <PopoverTrigger>
      <div class="flex items-center gap-2">
        <Avatar>
          <AvatarFallback>{{
            user.name.charAt(0).toUpperCase()
          }}</AvatarFallback>
        </Avatar>

        <ChevronUp v-if="menuOpen" class="h-5 w-5" />
        <ChevronDown v-else class="h-5 w-5" />
      </div>
    </PopoverTrigger>
    <PopoverContent
      class="rounded-t-none border-0 border-t border-slate-100 shadow-xl max-sm:w-screen"
    >
      <button
        class="flex w-full items-center gap-2 rounded-lg px-4 hover:bg-slate-200"
        @click="logout()"
      >
        <div class="h-6 w-6">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              d="M13 3c1.1 0 2 .9 2 2v2c0 .6-.4 1-1 1s-1-.4-1-1V5H4v14h9v-2c0-.6.4-1 1-1s1 .4 1 1v2c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V5c0-1.1.9-2 2-2h9zm5.1 4.8 3.6 3.6c.4.4.4 1 0 1.4l-3.6 3.6c-.4.4-1 .4-1.4 0-.4-.4-.4-1 0-1.4l1.9-1.9H9c-.5 0-1-.4-1-1s.4-1 1-1h9.6l-1.9-1.9c-.4-.4-.4-1 0-1.4.4-.4 1-.4 1.4 0z"
            ></path>
          </svg>
        </div>
        <span class="leading-10">Cerrar sesión</span>
      </button>
    </PopoverContent>
  </Popover>
</template>
