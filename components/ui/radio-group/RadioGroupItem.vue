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
        'h-5 w-5 cursor-default rounded-full border border-neutral-400 bg-white shadow-sm outline-none data-[state=checked]:border-0 data-[state=checked]:bg-green-600',
        props.class,
      )
    "
  >
    <RadioGroupIndicator
      class="relative flex h-full w-full items-center justify-center after:block after:h-2 after:w-2 after:rounded-[50%] after:bg-white after:content-['']"
    >
    </RadioGroupIndicator>
  </RadioGroupItem>
</template>
