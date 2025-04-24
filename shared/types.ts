import type { users as UserWithPassword } from "@prisma/client";

export type User = Omit<UserWithPassword, "password" | "id">;

export type { categoryParent } from "~/server/api/categories/index.get";
