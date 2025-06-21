"use client";

import { AuthenticationProviderComponent } from "@/components/providers/authentication";
import AuthenticationMode from "@/enums/AuthenticationState";
import { useNavigationStore } from "@/stores/navigation";
import { usePathname } from "next/navigation";
import { type PropsWithChildren, useEffect } from "react";

export default function Layout({ children }: PropsWithChildren) {
	const navigationStore = useNavigationStore();
	const pathname = usePathname();

	useEffect(() => {
		navigationStore.setBasePath({
			title: "Home",
			url: "/",
		});

		navigationStore.setEnableOrganizations(true);
	}, [pathname]);

	return (
		<AuthenticationProviderComponent mode={AuthenticationMode.Authenticated}>
			{children}
		</AuthenticationProviderComponent>
	);
}
