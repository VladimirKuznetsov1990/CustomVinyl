const { z } = require('zod');

const TrackSchema = z.object({
    id: z.number(),
    trackName: z.string(),
    originalName: z.string(),
    trackListId: z.number(),
});

const TrackReqBodySchema = TrackSchema.omit({ id: true });


module.exports = { TrackSchema, TrackReqBodySchema };
