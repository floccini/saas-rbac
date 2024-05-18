import { z } from 'zod';

export const roleSchema = z.union([
  z.literal('Admin'),
  z.literal('Member'),
  z.literal('Billing'),
]);

export type Role = z.infer<typeof roleSchema>;
