import { z } from 'zod';

export const VinylSchema = z.object({
    id: z.number(),
    userId: z.number(),
    color: z.string(),
    userImg: z.string(),
    formatId: z.number(),
    price: z.number().nonnegative(),
    trackListId: z.number(),
});

export const VinylsSchema = z.array(VinylSchema);