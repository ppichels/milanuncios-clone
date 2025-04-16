<script lang="ts" setup>
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { inject } from "vue";
import * as z from "zod";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";

import type Modal from "~/types/Modal";
import { modalKey } from "~/types/injectKeys";

const { toggleModal } = inject(modalKey) as Modal;

const formSchema = toTypedSchema(
  z.object({
    email: z.string().min(2).max(50),
    password: z.string().min(8),
    remember: z.boolean().default(false),
  })
);

const loading = ref(false);
const formError = ref(null);

const { handleSubmit } = useForm({
  validationSchema: formSchema,
});

const onSubmit = handleSubmit(async (values) => {
  const { login } = useAuth();

  loading.value = true;
  try {
    await login(values.email, values.password, values.remember);

    toggleModal(false);
  } catch (error: any) {
    console.log(error.data);
    if (error.data.message) formError.value = error.data.message;
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <form class="space-y-4 flex flex-col justify-center" @submit="onSubmit">
    <FormField v-slot="{ componentField }" name="email">
      <FormItem>
        <FormLabel>Email</FormLabel>
        <FormControl>
          <Input type="email" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="password">
      <FormItem>
        <FormLabel>Contraseña</FormLabel>
        <FormControl>
          <Input type="password" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <Button type="button" variant="link" class="text-black w-fit mx-auto">
      ¿Has olvidado la contraseña?
    </Button>

    <FormField v-slot="{ value, handleChange }" type="checkbox" name="remember">
      <FormItem class="flex flex-row items-start gap-x-3 space-y-0">
        <FormControl>
          <Checkbox :model-value="value" @update:model-value="handleChange" />
        </FormControl>
        <div class="space-y-1 leading-none">
          <FormLabel>No cerrar sesión</FormLabel>
          <FormMessage />
        </div>
      </FormItem>
    </FormField>

    <span class="text-destructive">
      {{ formError }}
    </span>

    <Button :loading="loading" type="submit" class="font-medium"
      >Inicia Sesión
    </Button>
  </form>
</template>
