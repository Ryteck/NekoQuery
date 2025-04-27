import environmentSchema from "../schemas/zod/environment";

export const { PORT, JWT_SECRET } = environmentSchema.parse(Bun.env);
