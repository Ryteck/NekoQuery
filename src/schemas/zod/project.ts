import { z } from "zod";

const projectSchema = z.object({
	id: z.string().uuid(),
	name: z.string(),
	teamId: z.string().uuid(),
	slug: z.string(),
	stamp: z.string(),
});

export default projectSchema;

export type ProjectSchema = z.infer<typeof projectSchema>;
