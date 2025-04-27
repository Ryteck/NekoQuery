import { z } from "zod";

const environmentSchema = z.object({
	SERVER_PORT: z.coerce.number(),
	DATABASE_URL: z.string().url(),
	JWT_SECRET: z.string(),
});

export default environmentSchema;

export type EnvironmentSchema = z.infer<typeof environmentSchema>;
