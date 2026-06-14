import { User } from "@/models/User";

export async function findUserByEmail(email: string) {
  return User.findOne({ email }).select("_id email").lean();
}