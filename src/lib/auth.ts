import { db } from "@/db";
import * as schema from "@/db/schema/auth-schema";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { openAPI } from "better-auth/plugins";

export const auth = betterAuth({
	plugins: [openAPI()],

	database: drizzleAdapter(db, {
		provider: "pg",
		schema,
	}),

	emailAndPassword: {
		enabled: true,
	},
});
