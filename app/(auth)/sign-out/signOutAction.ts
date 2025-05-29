"use server";
import { cookies } from "next/headers";

export async function signOutAction() {
  const cookie = await cookies();
  cookie.delete("token");
}
