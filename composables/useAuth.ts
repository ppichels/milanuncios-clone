import type { Type } from "@prisma/client";
import type { User } from "~/shared/types";

export const useAuth = () => {
  const useAuthLoading = () => useState<boolean>("auth_loading", () => true);

  const authUser = useAuthUser();

  const setUser = (user: Omit<User, "id"> | null) => {
    authUser.value = user;
  };

  const login = async (email: string, password: string, remember: boolean) => {
    const data = await $fetch("/auth/login", {
      method: "POST",
      body: {
        email,
        password,
        remember,
      },
    });

    setUser(data.user);

    return authUser;
  };

  const register = async (
    name: string,
    email: string,
    password: string,
    type: Type
  ) => {
    const data = await $fetch("/auth/register", {
      method: "POST",
      body: {
        name,
        email,
        password,
        type,
      },
    });

    setUser(data);

    return authUser;
  };

  const logout = async () => {
    const data = await $fetch("/auth/logout", {
      method: "POST",
    });

    setUser(data.user);
  };

  const initAuth = async () => {
    if (!authUser.value) {
      const loading = useAuthLoading();
      loading.value = true;

      try {
        const data = await $fetch("/auth/user", {
          headers: useRequestHeaders(["cookie"]) as HeadersInit,
        });

        setUser(data.user);
      } catch (error) {
        setUser(null);
      }

      loading.value = false;
    }

    return authUser;
  };

  return {
    login,
    register,
    logout,
    initAuth,
    useAuthLoading,
  };
};
