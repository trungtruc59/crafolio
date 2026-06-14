import { connectDB } from "@/lib/db";
import { User } from "@/models/User";
import { hashPassword } from "@/lib/password";
import { registerSchema } from "@/lib/validations/auth.schema";
import { successResponse, errorResponse } from "@/lib/api-response";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const parsed = registerSchema.safeParse(body);

    if (!parsed.success) {
      return errorResponse({
        code: 400,
        messageKey: "auth.invalidRegisterData",
        errors: parsed.error.flatten().fieldErrors,
      });
    }

    const { name, email, password } = parsed.data;

    await connectDB();

    const existingUser = await User.findOne({
      email: email.toLowerCase(),
    });

    if (existingUser) {
      return errorResponse({
        code: 409,
        messageKey: "auth.emailAlreadyExists",
      });
    }

    const hashedPassword = await hashPassword(password);

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      role: "user",
      authProvider: "credentials",
      emailVerified: false,
    });

    return successResponse({
      code: 201,
      messageKey: "auth.registerSuccess",
      data: {
        user: {
          id: String(user._id),
          name: user.name,
          email: user.email,
          role: user.role,
          avatar: user.avatar ?? null,
        },
      },
    });
  } catch (error) {
    console.error("REGISTER_ERROR", error);

    return errorResponse({
      code: 500,
      messageKey: "common.serverError",
    });
  }
}