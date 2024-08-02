import { z } from 'zod';

export const FormatSchema = z.object({
    id: z.number(),
    name: z.string(),
});

export const FormatesSchema = z.array(FormatSchema);