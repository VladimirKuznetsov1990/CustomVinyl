const { z } = require('zod');

const VinylSchema = z.object({
    id: z.number(),
    userId: z.number(),
    color: z.string(),
    userImg: z.string(),
    formatId: z.number(),
    price: z.number().nonnegative(),
    trackListId: z.number(),
});

const vinylReqBodySchema = VinylSchema.omit({ id: true });


module.exports = { VinylSchema, vinylReqBodySchema };
