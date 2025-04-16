import bcrypt from "bcrypt";

export async function hashPassword(plainPassword: string) {
  return await bcrypt.hash(plainPassword, 10);
}

export async function verifyPassword(hash: string, plainPassword: string) {
  return await bcrypt.compare(hash, plainPassword);
}
