"use client";

import { gruppoFont } from "@/fonts/gruppo";
import { authClient } from "@/lib/auth-client";
import { LayoutDashboardIcon, LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import ButtonComponent from "./ui/button";
import NavLinkComponent from "./ui/nav-link";

export default function HeaderComponent() {
	const router = useRouter();

	const session = authClient.useSession();
	const hasSession = session.data !== null;

	return session.isPending ? null : (
		<header className="flex gap-6 items-center">
			<LayoutDashboardIcon size={48} absoluteStrokeWidth />

			<h2 className={`${gruppoFont.className} text-5xl`}>Neko Query</h2>

			<div className="flex-1 flex gap-6 items-center justify-end">
				<NavLinkComponent href="/">Home</NavLinkComponent>
				<NavLinkComponent href="/about">About</NavLinkComponent>

				{hasSession && (
					<>
						<NavLinkComponent href="/dashboard">Dashboard</NavLinkComponent>

						<ButtonComponent
							onClick={async () => {
								await authClient.signOut({
									fetchOptions: {
										onSuccess: () => router.push("/"),
									},
								});
							}}
						>
							<LogOutIcon />
						</ButtonComponent>
					</>
				)}

				{!hasSession && (
					<>
						<NavLinkComponent href="/sign-in">Sign In</NavLinkComponent>

						<ButtonComponent
							onClick={() => {
								router.push("/sign-up");
							}}
						>
							Get Start
						</ButtonComponent>
					</>
				)}
			</div>
		</header>
	);
}
