<script setup lang="ts">
import type { RadioGroupItemProps } from "reka-ui";
import type { HTMLAttributes } from "vue";
import { cn } from "@/lib/utils";
import { RadioGroupIndicator, RadioGroupItem, useForwardProps } from "reka-ui";
import { computed } from "vue";

const props = defineProps<
  RadioGroupItemProps & { class?: HTMLAttributes["class"] }
>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
  <RadioGroupItem
    v-bind="forwardedProps"
    :class="
      cn(
        'bg-white w-5 h-5 rounded-full border border-neutral-400 data-[state=checked]:border-0 data-[state=checked]:bg-green-600 shadow-sm outline-none cursor-default',
        props.class
      )
    "
  >
    <RadioGroupIndicator
      class="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-2 after:h-2 after:rounded-[50%] after:bg-white"
    >
    </RadioGroupIndicator>
  </RadioGroupItem>
</template>
