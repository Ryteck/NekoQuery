import environmentSchema from "../schemas/environment";

export const { PORT, JWT_SECRET } = environmentSchema.parse(Bun.env);
