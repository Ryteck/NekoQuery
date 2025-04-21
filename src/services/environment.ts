import environmentSchema from "../schemas/environment";

export const { PORT } = environmentSchema.parse(Bun.env);
