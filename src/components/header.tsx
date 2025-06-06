"use client";

import { gruppoFont } from "@/fonts/gruppo";
import { authClient } from "@/lib/auth-client";
import { LayoutDashboardIcon, LogOutIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ThemeModeToggleComponent } from "./theme-mode-toggle";
import { Button } from "./ui/button";

export default function HeaderComponent() {
	const router = useRouter();

	const session = authClient.useSession();
	const hasSession = session.data !== null;

	return session.isPending ? null : (
		<header className="flex gap-6 items-center">
			<LayoutDashboardIcon size={48} absoluteStrokeWidth />

			<h2 className={`${gruppoFont.className} text-5xl`}>Neko Query</h2>

			<div className="flex-1 flex gap-2 items-center justify-end">
				<Button variant="link" asChild>
					<Link href="/">Home</Link>
				</Button>

				<Button variant="link" asChild>
					<Link href="/about">About</Link>
				</Button>

				{hasSession && (
					<>
						<Button variant="link" asChild>
							<Link href="/dashboard">Dashboard</Link>
						</Button>

						<Button
							size="icon"
							onClick={async () => {
								await authClient.signOut({
									fetchOptions: {
										onSuccess: () => router.push("/"),
									},
								});
							}}
						>
							<LogOutIcon />
						</Button>
					</>
				)}

				{!hasSession && (
					<>
						<Button variant="link" asChild>
							<Link href="/sign-in">Sign In</Link>
						</Button>

						<Button
							onClick={() => {
								router.push("/sign-up");
							}}
						>
							Get Start
						</Button>
					</>
				)}

				<ThemeModeToggleComponent />
			</div>
		</header>
	);
}
