import { z } from "zod";

export const { PORT } = z
	.object({
		PORT: z.coerce.number(),
		DATABASE_URL: z.string().url(),
	})
	.parse({
		PORT: Bun.env.PORT,
		DATABASE_URL: Bun.env.DATABASE_URL,
	});
