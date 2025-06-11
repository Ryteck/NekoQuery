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
	if (session.isPending || !!session.data) return null;

	return (
		<header className="flex gap-6 items-center">
			<LayoutDashboardIcon
				size={48}
				absoluteStrokeWidth
				className="min-w-12 min-h-12 hidden sm:block "
			/>

			<h2
				className={`${gruppoFont.className} hidden sm:block text-2xl md:text-5xl`}
			>
				Neko Query
			</h2>

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
					className="ml-auto sm:ml-0"
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
