"use server";

import prisma from "@/lib/prisma";
import { registerSchema, RegisterSchema } from "@/schema/registerSchema";
import bcrypt from "bcrypt";
import { Keypair } from "@solana/web3.js";
import jwt from "jsonwebtoken";
import { encrypt } from "@/utils/encryption";
import { cookies } from "next/headers";

export default async function registerAction(data: RegisterSchema) {
  const validatedData = registerSchema.safeParse(data);
  if (!validatedData.success) {
    return {
      success: false,
      error: validatedData.error.errors.map((error) => (error.message)),
    }
  }

  const { firstName, lastName, email, password } = validatedData.data;

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return {
        success: false,
        error: "User with this email already exists.",
      };
    }
  } catch (error) {
    console.error("Error checking existing user:", error);
    return {
      success: false,
      error: "An error occurred while checking for existing users.",
    };
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const keypair = new Keypair();

  const encryptedPrivateKey = encrypt(keypair.secretKey.toString());

  try {
    await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        privateKey: encryptedPrivateKey,
        publicKey: keypair.publicKey.toString(),
      }
    });

    const token = jwt.sign({ email, firstName, lastName }, process.env.JWT_SECRET);

    const cookie = await cookies();

    cookie.set({
      name: "token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    })

    return {
      success: true,
      publicKey: keypair.publicKey.toString(),
    }
  } catch (error) {
    console.error("Error creating user:", error);
    return {
      success: false,
      error: "An error occurred while creating the user.",
    };
  }
}
