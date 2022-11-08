export const userSchema = {
  _id: { type: "string", format: "uuid" },
  email: { type: "string" },
  created_at: { type: "string", format: "date-time" },
  updated_at: { type: "string", format: "date-time" },
};

export const listUsersSchema = {
  summary: "users",
  description: "users",
  response: {
    200: {
      type: "array",
      items: {
        properties: userSchema,
      },
    },
  },
};

