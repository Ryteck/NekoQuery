"use client";

import { authClient } from "@/lib/auth-client";
import { AppSidebarLoadedComponent } from "./loaded";

export function AppSidebarComponent() {
	const session = authClient.useSession();

	if (session.isPending || !session.data) return null;

	return <AppSidebarLoadedComponent session={session.data} />;
}
