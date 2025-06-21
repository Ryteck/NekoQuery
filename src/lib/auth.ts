import { db } from "@/db";
import * as schema from "@/db/schema/auth";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { openAPI, organization } from "better-auth/plugins";

export const auth = betterAuth({
	plugins: [openAPI(), organization()],

	database: drizzleAdapter(db, {
		provider: "pg",
		schema,
	}),

	emailAndPassword: {
		enabled: true,
	},

	user: {
		changeEmail: {
			enabled: true,
		},
	},
});

export type BetterAuthSession = typeof auth.$Infer.Session;
export type BetterAuthOrganization = typeof auth.$Infer.Organization;
export type BetterAuthMember = typeof auth.$Infer.Member;
export type BetterAuthInvitation = typeof auth.$Infer.Invitation;
