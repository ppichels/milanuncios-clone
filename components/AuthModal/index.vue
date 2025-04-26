<script lang="ts" setup>
import { provide } from "vue";

import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-vue-next";
import { authModalKey } from "~/types/injectKeys";

const props = defineProps<{ open: boolean }>();
const emit = defineEmits(["update:open"]);

export type ViewsEnum =
  | "method-select"
  | "email-auth"
  | "reset-password"
  | "signup-completed";
export type TabsEnum = "login" | "signin";
const selectedTab = ref<TabsEnum>("login");

const setTab = (tab: TabsEnum) => {
  selectedTab.value = tab;
};

const selectedView = ref<ViewsEnum>("method-select");

function toggleModal(value: boolean) {
  emit("update:open", value);
}

const changeView = (view: ViewsEnum, tab?: TabsEnum) => {
  selectedView.value = view;

  if (tab) {
    setTab(tab);
  }
};

provide(authModalKey, { toggleModal, changeView });
</script>

<template>
  <ActionDialog
    :open="props.open"
    @update:open="(value: boolean) => toggleModal(value)"
  >
    <AuthModalSelectMethod v-if="selectedView === 'method-select'" />

    <template v-if="selectedView === 'email-auth'" #header>
      <Button variant="ghost" size="icon" @click="changeView('method-select')"
        ><ChevronLeft class="size-4"
      /></Button>
    </template>

    <AuthModalEmailMethod
      v-if="selectedView === 'email-auth'"
      v-model:selected-tab="selectedTab"
    />

    <AuthModalSignUpCompleted v-if="selectedView === 'signup-completed'" />
  </ActionDialog>
</template>
