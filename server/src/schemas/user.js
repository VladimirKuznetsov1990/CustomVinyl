const { z } = require('zod');

const UserSchema = z.object({
  id: z.number(),
  userName: z.string(),
  email: z.string(),
  address: z.string(),
  phone: z.string(),
  roleId: z.number(),
});

module.exports = { UserSchema };