import "./globals.css";

import { AppSidebarComponent } from "@/components/app-sidebar";
import HeaderComponent from "@/components/header";
import NavigationComponent from "@/components/navigation";
import ThemeProviderComponent from "@/components/providers/theme";
import { SidebarProvider } from "@/components/ui/sidebar";
import type { Metadata } from "next";
import type { PropsWithChildren } from "react";

export const metadata: Metadata = {
	title: "Neko Query",
	description: "Team-based GUI database manager",
};

export default function Layout({ children }: PropsWithChildren) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className="h-screen dark:bg-gradient-to-tr dark:from-neutral-950 dark:via-purple-950 dark:to-neutral-950">
				<ThemeProviderComponent
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<SidebarProvider>
						<AppSidebarComponent />

						<div className="h-screen w-full flex flex-col p-6 gap-6 overflow-auto">
							<HeaderComponent />

							<main className="container flex-1 mx-auto">
								<NavigationComponent />

								{children}
							</main>

							<footer className="mx-auto">
								<p className="text-muted-foreground text-sm">
									© 2025 Neko Query. All rights reserved.
								</p>
							</footer>
						</div>
					</SidebarProvider>
				</ThemeProviderComponent>
			</body>
		</html>
	);
}
