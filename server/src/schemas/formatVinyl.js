const { z } = require('zod');

const FormatSchema = z.object({
  id: z.number(),
  format: z.string(),
});

module.exports = { FormatSchema };
