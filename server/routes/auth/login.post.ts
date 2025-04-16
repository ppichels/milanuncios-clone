import prisma from "~/server/lib/prisma";
import { serialize, sign } from "~/server/lib/cookie";
import { verifyPassword } from "~/server/lib/password";
import { z } from "zod";

const userSchema = z.object({
  remember: z.boolean(),
  email: z.string().email(),
  password: z.string().min(8),
});

export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, userSchema.safeParse);

  if (!result.success) {
    throw createError({
      status: 400,
      message: "Invalid data",
      data: result.error.errors[0].message,
    });
  }

  const body = result.data;

  const { email, password, remember } = body;

  const user = await prisma.users.findUnique({
    where: { email },
  });

  if (!user) {
    throw createError({
      statusCode: 400,
      message:
        "No se ha podido iniciar sesión, por favor comprueba tu correo electrónico y contraseña.",
    });
  }

  const verified = await verifyPassword(password, user.password);
  if (!verified) {
    throw createError({
      statusCode: 401,
      message: "Bad credentials",
    });
  }

  const config = useRuntimeConfig();

  const session = serialize({ userId: user.id });
  const signedSession = sign(session, config.cookieSecret);

  setCookie(event, config.cookieName, signedSession, {
    httpOnly: true,
    path: "/",
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    expires: remember
      ? new Date(Date.now() + parseInt(config.cookieRememberMeExpires))
      : new Date(Date.now() + parseInt(config.cookieExpires)),
  });

  const { password: _password, ...userWithoutPassword } = user;

  return {
    user: userWithoutPassword,
  };
});
