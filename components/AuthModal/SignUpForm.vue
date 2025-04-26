<script lang="ts" setup>
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { toast } from "@/components/ui/toast/use-toast";

import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import * as z from "zod";

import type Modal from "~/types/AuthModal";
import { authModalKey } from "~/types/injectKeys";

const { changeView } = inject(authModalKey) as Modal;

const { register } = useAuth();

const formSchema = toTypedSchema(
  z.object({
    name: z.string().min(2).max(50),
    email: z.string().min(2).max(50),
    password: z.string().min(8),
    type: z.enum(["private", "professional"]),
    terms: z.boolean({
      required_error: "Es necesario que aceptes las condiciones",
    }),
  }),
);

const loading = ref(false);
// const formError = ref(null);

const { handleSubmit } = useForm({
  validationSchema: formSchema,
});

const onSubmit = handleSubmit(async (values) => {
  loading.value = true;
  try {
    await register(values.name, values.email, values.password, values.type);
    changeView("signup-completed");
  } catch (error: any) {
    if (error?.data?.flash) {
      toast({
        title: error?.data?.flash,
      });
    }
  }
  loading.value = false;
});
</script>

<template>
  <form class="flex flex-col justify-center space-y-4" @submit="onSubmit">
    <FormField v-slot="{ componentField }" name="name">
      <FormItem>
        <FormLabel>Nombre</FormLabel>
        <FormControl>
          <Input type="text" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
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

    <FormField v-slot="{ componentField }" type="radio" name="type">
      <FormItem>
        <FormLabel>Selecciona el tipo de cuenta</FormLabel>
        <FormControl>
          <RadioGroup class="flex flex-col space-y-1" v-bind="componentField">
            <FormItem class="flex flex-row items-start gap-x-3 space-y-0">
              <FormControl>
                <RadioGroupItem value="private" />
              </FormControl>
              <div class="space-y-1 leading-none">
                <FormLabel class="font-normal"> Particular </FormLabel>
                <FormDescription> Para uso personal </FormDescription>
              </div>
            </FormItem>
            <FormItem class="flex flex-row items-start gap-x-3 space-y-0">
              <FormControl>
                <RadioGroupItem value="professional" />
              </FormControl>
              <div class="space-y-1 leading-none">
                <FormLabel class="font-normal"> Profesional </FormLabel>
                <FormDescription>
                  Para uso comercial o de empresa
                </FormDescription>
              </div>
            </FormItem>
          </RadioGroup>
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ value, handleChange }" type="checkbox" name="terms">
      <FormItem class="flex flex-row items-start gap-x-3 space-y-0">
        <FormControl>
          <Checkbox :model-value="value" @update:model-value="handleChange" />
        </FormControl>
        <div class="space-y-1 leading-none">
          <FormLabel
            >Acepto las condiciones de uso y la información básica sobre
            protección de datos.</FormLabel
          >
          <FormMessage />
        </div>
      </FormItem>
    </FormField>

    <Button :loading="loading" type="submit" class="font-medium"
      >Crear cuenta
    </Button>
  </form>
</template>
