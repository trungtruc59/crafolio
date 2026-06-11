import jwt from "jsonwebtoken";

export type AuthTokenPayload = {
  userId: string;
  email: string;
  role: "user" | "admin";
};

export function signToken(payload: AuthTokenPayload) {
  return jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: "2d",
  });
}

export function verifyToken(token: string) {
  return jwt.verify(token, process.env.JWT_SECRET!) as AuthTokenPayload;
}