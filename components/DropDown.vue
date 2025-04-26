<script lang="ts" setup>
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-vue-next";
import { Input } from "@/components/ui/input";

interface DropdownMenuItem {
  label?: string;
  slot?: string;
}

defineEmits(["update:modelValue"]);
defineProps<{
  modelValue?: string;
  placeholder: string;
  items?: DropdownMenuItem[];
}>();
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger class="relative" as-child>
      <div>
        <Input
          :model-value="modelValue"
          :placeholder="placeholder"
          readonly
          class="flex h-10 w-full justify-between rounded-lg border border-slate-400 bg-transparent py-1 pl-10 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
        </Input>
        <span
          class="absolute inset-y-0 start-0 flex items-center justify-center px-3"
        >
          <svg
            class="size-6"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M8.702 4.715A1.008 1.008 0 0 0 8.71 3.29a1.005 1.005 0 0 0-1.422.008L5.353 5.243a.5.5 0 0 1-.674.03l-.016-.014-.017-.016.011.01a1.004 1.004 0 0 0-1.366.045 1.008 1.008 0 0 0 .007 1.424l.288.292a1.999 1.999 0 0 0 2.828 0l2.288-2.3Zm-4.045.539a.517.517 0 0 0 .014.012l-.008-.008-.006-.004Z"
            ></path>
            <path d="M12 5a1 1 0 1 0 0 2h8a1 1 0 1 0 0-2h-8Z"></path>
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M8.702 10.714a1.008 1.008 0 0 0 .007-1.423 1.005 1.005 0 0 0-1.422.008l-1.934 1.944a.5.5 0 0 1-.674.03l-.016-.014-.017-.016.011.01a1.004 1.004 0 0 0-1.366.045 1.008 1.008 0 0 0 .007 1.424l.288.292a1.999 1.999 0 0 0 2.828 0l2.288-2.3Zm-4.045.54a.496.496 0 0 0 .014.012l-.008-.008-.006-.004Z"
            ></path>
            <path
              d="M12 11a1 1 0 1 0 0 2h8a1 1 0 1 0 0-2h-8Zm-3.29 4.291c.39.391.387 1.028-.008 1.424l-2.288 2.299a1.999 1.999 0 0 1-2.828 0l-.288-.292a1.008 1.008 0 0 1-.007-1.424 1.004 1.004 0 0 1 1.38-.032l-.008-.007.016.014a.5.5 0 0 0 .674-.03l1.934-1.944a1.005 1.005 0 0 1 1.422-.008Z"
            ></path>
            <path
              d="m4.663 17.259-.017-.016.011.01.006.006ZM11 18a1 1 0 0 1 1-1h8a1 1 0 1 1 0 2h-8a1 1 0 0 1-1-1Z"
            ></path>
          </svg>
        </span>

        <span
          class="absolute inset-y-0 end-0 flex items-center justify-center px-3"
        >
          <ChevronDown class="size-6 text-muted-foreground"></ChevronDown>
        </span>
      </div>
    </DropdownMenuTrigger>
    <DropdownMenuContent v-if="items" class="w-full">
      <DropdownMenuItem
        v-for="(item, index) in items"
        :key="index"
        @click="$emit('update:modelValue', item)"
      >
        <slot :name="item.slot || 'item'">
          <span>{{ item.label }}</span>
        </slot>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
