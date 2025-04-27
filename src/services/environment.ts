import environmentSchema from "../schemas/zod/environment";

export const { SERVER_PORT, JWT_SECRET } = environmentSchema.parse(Bun.env);
