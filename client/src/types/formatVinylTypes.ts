import { z } from 'zod';

export const FormatSchema = z.object({
  id: z.number(),
  format: z.string(),
  description: z.string(),
});

export const FormatesSchema = z.array(FormatSchema);

export type FormatType = z.infer<typeof FormatSchema>;

export type FormatListType = FormatType[];
