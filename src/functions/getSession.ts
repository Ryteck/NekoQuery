import { type BetterAuthSession, auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function getSessionFunction(): Promise<BetterAuthSession> {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (session === null) throw new Error("Unauthenticated");

	return session;
}
