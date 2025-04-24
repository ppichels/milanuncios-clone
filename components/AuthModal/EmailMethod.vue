<script lang="ts" setup>
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import type { TabsEnum } from "./index.vue";

defineProps<{
  selectedTab: TabsEnum;
}>();
const emit = defineEmits(["update:selectedTab"]);
</script>

<template>
  <div class="inline-flex w-full flex-col gap-3">
    <Tabs
      class="-m-6"
      :model-value="selectedTab"
      @update:model-value="(value) => emit('update:selectedTab', value)"
    >
      <TabsList class="grid w-full grid-cols-2">
        <TabsTrigger value="login"> Iniciar sesión </TabsTrigger>
        <TabsTrigger value="signin"> Crear cuenta </TabsTrigger>
      </TabsList>
      <TabsContent value="login">
        <div class="p-6">
          <AuthModalLoginForm />
        </div>
      </TabsContent>
      <TabsContent value="signin">
        <div class="p-6">
          <AuthModalSignUpForm />
        </div>
      </TabsContent>
    </Tabs>
  </div>
</template>
