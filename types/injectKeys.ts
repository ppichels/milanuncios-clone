import type { InjectionKey } from "vue";
import type AuthModal from "./AuthModal";
import type CategoriesModal from "./CategoriesModal";

export const authModalKey = Symbol() as InjectionKey<AuthModal>;
export const categoriesModalKey = Symbol() as InjectionKey<CategoriesModal>;
