"use client";

import { authClient } from "@/lib/auth-client";
import { useNavigationStore } from "@/stores/navigation";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { NavigationLoadedComponent } from "./loaded";

export function NavigationComponent() {
	const session = authClient.useSession();
	const navigationStore = useNavigationStore();
	const pathname = usePathname();

	useEffect(() => {
		navigationStore.reset();
	}, [pathname]);

	if (session.isPending || !session.data) return null;

	return <NavigationLoadedComponent />;
}
