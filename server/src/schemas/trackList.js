const { z } = require('zod');

const TrackListSchema = z.object({
    id: z.number(),
    userId: z.number(),
});

const TrListReqBodySchema = TrackListSchema.omit({ id: true });


module.exports = { TrackListSchema, TrListReqBodySchema };


