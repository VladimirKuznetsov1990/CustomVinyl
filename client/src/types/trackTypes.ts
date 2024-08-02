import { z } from 'zod';

export const TrackSchema = z.object({
    id: z.number(),
    trackName: z.string(),
    originalName: z.string(),
    trackListId: z.number(),
});

export const TracksSchema = z.array(TrackSchema);
export const TrackReqBodySchema = TrackSchema.omit({ id: true });