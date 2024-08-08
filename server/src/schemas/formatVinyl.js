const { z } = require('zod');

const FormatSchema = z.object({
  id: z.number(),
  format: z.string(),
  description: z.string().optional(), 
});

module.exports = { FormatSchema };
