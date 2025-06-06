"use client";

import { Button } from "@/components/ui/button";
import { useQueryState } from "@/hooks/queryState";
import type { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
	const [tab, setTab] = useQueryState("tab", "home");

	return (
		<div className="flex gap-4 h-full">
			<div className="bg-neutral-900 p-4 flex flex-col gap-2 rounded-xl h-fit">
				{[
					"Project",
					"Schemas",
					"Playground",
					"Stats",
					"Console",
					"Queries",
					"Members",
					"Reports",
					"Settings",
				].map((item) => (
					<Button
						type="button"
						key={item}
						variant="link"
						data-active={tab === item.toLowerCase()}
						disabled={tab === item.toLowerCase()}
						onClick={() => setTab(item.toLowerCase())}
					>
						{item}
					</Button>
				))}
			</div>
			{children}
		</div>
	);
}
