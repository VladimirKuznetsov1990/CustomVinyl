import { z } from 'zod';

export const TrackListSchema = z.object({
    id: z.number(),
    userId: z.number(),
});

export const TrackListsSchema = z.array(TrackListSchema);
export const TrListReqBodySchema = TrackListSchema.omit({ id: true });