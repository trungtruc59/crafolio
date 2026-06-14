import mongoose, { Schema, model, models } from "mongoose";

export type UserRole = "user" | "admin";
export type AuthProvider = "credentials" | "google";

export interface IUser {
  name: string;
  email: string;
  password?: string;

  role: UserRole;

  avatar?: string;

  authProvider: AuthProvider;

  googleId?: string;

  emailVerified: boolean;

  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 80,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    password: {
      type: String,
      required: false,
      select: false,
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    avatar: {
      type: String,
      default: null,
    },

    authProvider: {
      type: String,
      enum: ["credentials", "google"],
      default: "credentials",
    },

    googleId: {
      type: String,
      default: null,
      index: true,
    },

    emailVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    collection: "users",
  }
);

export const User =
  models.User || model<IUser>("User", UserSchema);