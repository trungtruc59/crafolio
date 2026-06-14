import { findUserByEmail } from "../repositories/user.repository";

export async function checkEmailExists(email: string) {
  const normalizedEmail = email.toLowerCase().trim();

  const user = await findUserByEmail(normalizedEmail);

  return {
    exists: Boolean(user),
  };
}