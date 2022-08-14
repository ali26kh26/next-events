import { hash, compare } from "bcrypt";

export async function hashPassword(password) {
  const encryptedPassword = await hash(password, 12);
  return encryptedPassword;
}

export async function verifyPassword(password, hashedPassword) {
  const isVaild = await compare(password, hashedPassword);
  return isVaild;
}
export function checkPassword(password) {
  if (!password || password.trim() === "" || password.length < 8) {
    return false;
  }
  return true;
}
