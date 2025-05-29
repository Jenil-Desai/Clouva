"use server";

import { loginSchema, LoginSchema } from "@/schema/loginSchema";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export default async function loginAction(data: LoginSchema) {
  const validatedData = loginSchema.safeParse(data);
  if (!validatedData.success) {
    return {
      success: false,
      error: validatedData.error.errors.map((error) => (error.message)),
    };
  }

  const { email, password } = validatedData.data;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return {
        success: false,
        error: "User with this email does not exist.",
      };
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return {
        success: false,
        error: "Invalid password.",
      };
    }

    const token = jwt.sign({ email: user.email, firstName: user.firstName, lastName: user.lastName }, process.env.JWT_SECRET);

    const cookie = await cookies();
    cookie.set("token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production" });

    return {
      success: true,
      message: "Login successful!",
    };
  } catch (error) {
    console.error("Error during login:", error);
    return {
      success: false,
      error: "An error occurred during login.",
    };
  }

}
