import AuthenticationProviderComponent from "@/components/providers/authentication";
import type { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
	return (
		<AuthenticationProviderComponent>
			{children}
		</AuthenticationProviderComponent>
	);
}
