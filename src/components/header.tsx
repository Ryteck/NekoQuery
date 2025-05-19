"use client";

import { gruppoFont } from "@/fonts/gruppo";
import { LayoutDashboardIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { ButtonComponent } from "./ui/button";
import { NavLinkComponent } from "./ui/nav-link";

export function HeaderComponent() {
	const router = useRouter();

	return (
		<header className="flex gap-6 items-center">
			<LayoutDashboardIcon size={48} absoluteStrokeWidth />

			<h2 className={`${gruppoFont.className} text-5xl`}>Neko Query</h2>

			<div className="flex-1 flex gap-6 items-center justify-end">
				<NavLinkComponent href="/">Home</NavLinkComponent>
				<NavLinkComponent href="/sign-in">Sign In</NavLinkComponent>
				<NavLinkComponent href="/about">About</NavLinkComponent>

				<ButtonComponent
					onClick={() => {
						router.push("/sign-up");
					}}
				>
					Get Start
				</ButtonComponent>
			</div>
		</header>
	);
}
