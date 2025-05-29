import { z } from 'zod';

export const transferSchema = z.object({
  recipientAddress: z.string().min(44, { message: 'Recipient address is required' }),
  amount: z.number().positive({ message: 'Amount must be a positive number' }),
});

export type TransferSchema = z.infer<typeof transferSchema>;

export const txSchema = z.object({
  serializedTransaction: z.string().min(1, { message: 'Serialized transaction is required' }),
  retry: z.boolean({ message: 'Retry option is required' }),
});

export type TxSchema = z.infer<typeof txSchema>;
