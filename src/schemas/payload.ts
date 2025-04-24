import { z } from "zod";

const payloadSchema = z.object({
	userId: z.string().uuid(),
});

export default payloadSchema;

export type PayloadSchema = z.infer<typeof payloadSchema>;
