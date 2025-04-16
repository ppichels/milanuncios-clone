import type { TabsEnum, ViewsEnum } from "~/components/AuthModal/index.vue";
import type Modal from "~/types/Modal";

export default interface Modal {
  toggleModal: (value: boolean) => void;
  changeView: (view: ViewsEnum, tab?: TabsEnum) => void;
}
