import prisma from "~/server/lib/prisma";
import { hashPassword } from "~/server/lib/password";
import { z } from "zod";
import { Type } from "@prisma/client";

const userSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
  type: z.nativeEnum(Type),
});

export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, userSchema.safeParse);

  if (!result.success) throw result.error.issues;

  const { email, password, name, type } = result.data;
  if (!email) {
    throw createError({ statusCode: 400, message: "Email is required" });
  }
  if (!password) {
    throw createError({ statusCode: 400, message: "Password is required" });
  }
  if (!name) {
    throw createError({ statusCode: 400, message: "Name is required" });
  }

  const user = await prisma.users.findUnique({
    where: { email },
  });

  if (user) {
    throw createError({ statusCode: 400, message: "Email already used" });
  }

  const userCreateData = {
    email,
    name,
    password: await hashPassword(password),
    type,
  };

  await prisma.users.create({ data: userCreateData });

  const { password: _password, ...userWithoutPassword } = userCreateData;

  return userWithoutPassword;
});
