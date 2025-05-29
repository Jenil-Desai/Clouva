"use client";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { TransferSchema, transferSchema } from "@/schema/transferSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Connection, LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import transferAction from "./transferAction";

const connection = new Connection("https://api.devnet.solana.com");

export default function TransferForm() {
  const [publicKey, setPublicKey] = useState("");

  const form = useForm({
    resolver: zodResolver(transferSchema),
    defaultValues: {
      recipientAddress: "",
      amount: 0.01,
    }
  });

  useEffect(() => {
    fetch("/api/user", {
      method: "GET",
    }).then((response) => {
      if (!response.ok) {
        toast.error("Failed to fetch user data.");
      } else {
        response.json().then((data) => {
          setPublicKey(data.publicKey);
        }).catch(() => {
          toast.error("Error parsing user data.");
        });
      }
    })
  })

  async function onSubmit(data: TransferSchema) {
    const ix = SystemProgram.transfer({
      fromPubkey: new PublicKey(publicKey),
      toPubkey: new PublicKey(data.recipientAddress),
      lamports: data.amount * LAMPORTS_PER_SOL,
    });
    const { blockhash } = await connection.getLatestBlockhash();

    const tx = new Transaction().add(ix);
    tx.recentBlockhash = blockhash
    tx.feePayer = new PublicKey(publicKey);

    const serializedTx = tx.serialize({
      requireAllSignatures: false,
      verifySignatures: false
    }).toString();

    const reponse = await transferAction({
      serializedTransaction: serializedTx,
      retry: false,
    });

    if (reponse.success) {
      toast.success("Transferred Successfully", {
        description: reponse.signature
      })
      form.reset()
    } else {
      toast.error(reponse.error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid space-y-4">
          <FormField
            control={form.control}
            name="recipientAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Recipient Address</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Recipient Address" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount</FormLabel>
                <FormControl>
                  <Input type="number" {...field} placeholder="Amount" min={0} step="any" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button disabled={form.formState.isSubmitting} type="submit">Transfer</Button>
        </div>
      </form>
    </Form>
  );
}
