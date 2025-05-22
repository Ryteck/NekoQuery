import "./globals.css";

import HeaderComponent from "@/components/header";
import type { Metadata } from "next";
import type { PropsWithChildren } from "react";

export const metadata: Metadata = {
	title: "Neko Query",
	description: "Team-based GUI database manager",
};

export default function Layout({ children }: PropsWithChildren) {
	return (
		<html lang="en">
			<body className="h-screen bg-gradient-to-tr from-neutral-950 via-purple-950 to-neutral-950 text-neutral-50">
				<div className="h-full flex flex-col p-6 gap-24 overflow-auto">
					<HeaderComponent />

					<main className="container flex-1 mx-auto">{children}</main>
				</div>
			</body>
		</html>
	);
}
