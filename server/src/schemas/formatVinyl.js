const { z } = require('zod');

const FormatSchema = z.object({
  id: z.number(),
  name: z.string(),
});

module.exports = { FormatSchema };
