import { z } from "zod";

const teamSchema = z.object({
	id: z.string().uuid(),
	name: z.string(),
	userId: z.string().uuid(),
	slug: z.string(),
	stamp: z.string(),
});

export default teamSchema;

export type TeamSchema = z.infer<typeof teamSchema>;
