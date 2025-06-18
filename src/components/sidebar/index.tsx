"use client";

import { authClient } from "@/lib/auth-client";
import { SidebarLoadedComponent } from "./loaded";

export function SidebarComponent() {
	const session = authClient.useSession();

	if (session.isPending || !session.data) return null;

	return <SidebarLoadedComponent session={session.data} />;
}
