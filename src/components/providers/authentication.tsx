"use client";

import AuthenticationMode from "@/enums/AuthenticationState";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { type PropsWithChildren, useEffect, useState } from "react";

interface Props {
	mode: AuthenticationMode;
}

export default function AuthenticationProviderComponent({
	children,
	mode,
}: PropsWithChildren<Props>) {
	const [isLoading, setIsLoading] = useState(true);
	const session = authClient.useSession();
	const router = useRouter();

	useEffect(() => {
		if (!session.isPending) {
			const hasSession = session.data !== null;

			if (mode === AuthenticationMode.Authenticated && !hasSession)
				return router.push("/");

			if (mode === AuthenticationMode.Unauthenticated && hasSession)
				return router.push("/dashboard");

			setIsLoading(false);
		}
	}, [session.isPending]);

	return isLoading || session.isPending ? null : children;
}
