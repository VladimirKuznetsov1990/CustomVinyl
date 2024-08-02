import { z } from 'zod';

// eslint-disable-next-line import/prefer-default-export
export const RoleSchema = z.object({
    id: z.number(),
    name: z.string(),
});