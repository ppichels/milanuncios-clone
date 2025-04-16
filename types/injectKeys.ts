import type { InjectionKey } from "vue";
import type Modal from "./Modal";

export const modalKey = Symbol() as InjectionKey<Modal>;
