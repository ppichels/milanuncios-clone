import type { users as User } from "@prisma/client";

declare module "h3" {
  interface H3EventContext {
    user?: User;
  }
}

export default defineEventHandler(async (event) => {
  const user = await getUserFromSession(event);
  if (user) event.context.user = user;
});
