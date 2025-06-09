"use client";

import { gruppoFont } from "@/fonts/gruppo";
import { authClient } from "@/lib/auth-client";
import { LayoutDashboardIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

export default function HeaderComponent() {
	const router = useRouter();

	const session = authClient.useSession();
	const hasSession = session.data !== null;

	if (hasSession) return null;

	return (
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
			</div>
		</header>
	);
}
