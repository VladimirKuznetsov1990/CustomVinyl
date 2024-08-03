import { z } from 'zod';

export const TrackListSchema = z.object({
    id: z.number(),
    userId: z.number(),
});

export const TrListReqBodySchema = TrackListSchema.omit({ id: true });

export type TrackListType = z.infer<typeof TrackListSchema>;

export type TrackListsType = TrackListType[];

export type TrackListDataType = Omit<TrackListType, 'id'>;

