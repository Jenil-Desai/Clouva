"use server"

import prisma from "@/lib/prisma";
import { txSchema, TxSchema } from "@/schema/transferSchema";
import { decrypt } from "@/utils/encryption";
import { Connection, Keypair, PublicKey, Transaction } from "@solana/web3.js";
import { cookies } from "next/headers";

export default async function transferAction(data: TxSchema) {
  const cookieStore = await cookies();
  const user = JSON.parse(cookieStore.get('user')!.value) as {
    email: string;
    firstName: string;
    lastName: string;
    publicKey: string;
  };

  if (!user) {
    return {
      success: false,
      error: "Unauthorized",
    }
  }

  const validatedData = txSchema.safeParse(data);
  if (!validatedData.success) {
    return {
      success: false,
      error: validatedData.error.errors.map((error) => (error.message)),
    }
  }

  const { serializedTransaction, retry } = validatedData.data;
  let userDetails;

  try {
    userDetails = await prisma.user.findUnique({
      where: { email: user.email },
    });
  } catch (error) {
    console.log("Error creating user:", error);
    return {
      success: false,
      error: "An error occurred while fetching the user.",
    };
  }

  if (userDetails) {
    const connection = new Connection("https://api.devnet.solana.com");
    const tx = Transaction.from(Buffer.from(serializedTransaction));
    const secretKeyString = decrypt(userDetails.privateKey);
    const secretKeyArray = secretKeyString.split(',').map(Number);
    const keypair = Keypair.fromSecretKey(Uint8Array.from(secretKeyArray));
    console.log(keypair);
    tx.sign(keypair);

    const signature = await connection.sendTransaction(tx, [keypair]);
    return {
      success: true,
      signature,
    }
  } else {
    return {
      success: false,
      error: "User Not Found"
    }
  }
}
