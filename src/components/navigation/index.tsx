"use client";

import { authClient } from "@/lib/auth-client";
import { NavigationLoadedComponent } from "./loaded";

export function NavigationComponent() {
	const session = authClient.useSession();

	if (session.isPending || !session.data) return null;

	return <NavigationLoadedComponent />;
}
