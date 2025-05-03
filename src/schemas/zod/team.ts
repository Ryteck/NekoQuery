import { z } from "zod";

const teamSchema = z.object({
	id: z.string().uuid(),
	name: z.string(),
	slug: z.string(),
	stamp: z.string(),
});

export default teamSchema;

export type TeamSchema = z.infer<typeof teamSchema>;
