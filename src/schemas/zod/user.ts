import { z } from "zod";

const userSchema = z.object({
	id: z.string().uuid(),
	name: z.string(),
	email: z.string().email(),
	password: z.string(),
	publicKey: z.string(),
});

export default userSchema;

export type UserSchema = z.infer<typeof userSchema>;
