import type { TabsEnum, ViewsEnum } from "~/components/AuthModal/index.vue";

export default interface AuthModal {
  toggleAuthModal: (value: boolean) => void;
  changeView: (view: ViewsEnum, tab?: TabsEnum) => void;
}
