import "./globals.css";

import type { Metadata } from "next";
import type { PropsWithChildren } from "react";

export const metadata: Metadata = {
	title: "Neko Query",
	description: "Team-based GUI database manager",
};

export default function Layout({ children }: PropsWithChildren) {
	return (
		<html lang="en">
			<body className="bg-neutral-950 text-neutral-200">{children}</body>
		</html>
	);
}
