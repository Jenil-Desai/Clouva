"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { signOutAction } from "./signOutAction";

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    signOutAction().then(() => {
      router.replace("/");
    });
  }, [router]);
}
