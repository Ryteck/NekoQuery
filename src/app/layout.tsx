import "./globals.css";

import HeaderComponent from "@/components/header";
import ThemeProviderComponent from "@/components/providers/theme";
import type { Metadata } from "next";
import type { PropsWithChildren } from "react";

export const metadata: Metadata = {
	title: "Neko Query",
	description: "Team-based GUI database manager",
};

export default function Layout({ children }: PropsWithChildren) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className="h-screen bg-gradient-to-tr from-neutral-950 via-purple-950 to-neutral-950 text-neutral-50">
				<ThemeProviderComponent
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<div className="h-full flex flex-col p-6 gap-10 overflow-auto">
						<HeaderComponent />

						<main className="container flex-1 mx-auto">{children}</main>

						<footer className="mx-auto">
							<p className="text-muted-foreground text-sm">
								© 2025 Neko Query. All rights reserved.
							</p>
						</footer>
					</div>
				</ThemeProviderComponent>
			</body>
		</html>
	);
}
