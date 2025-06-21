import { organizationClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
	plugins: [organizationClient()],
});

export type BetterAuthSession = typeof authClient.$Infer.Session;
export type BetterAuthOrganization = typeof authClient.$Infer.Organization;
export type BetterAuthMember = typeof authClient.$Infer.Member;
export type BetterAuthInvitation = typeof authClient.$Infer.Invitation;
