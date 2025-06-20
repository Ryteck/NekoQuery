import { AuthenticationProviderComponent } from "@/components/providers/authentication";
import AuthenticationMode from "@/enums/AuthenticationState";
import type { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
	return (
		<AuthenticationProviderComponent mode={AuthenticationMode.Unauthenticated}>
			{children}
		</AuthenticationProviderComponent>
	);
}
