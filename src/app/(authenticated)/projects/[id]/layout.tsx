"use client";

import { useQueryState } from "@/hooks/queryState";
import type { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
	const [tab, setTab] = useQueryState("tab", "home");

	return (
		<div className="flex gap-4 h-full">
			<div className="bg-neutral-900 p-4 flex flex-col divide-amber-500 divide-y rounded-xl">
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
					<button
						type="button"
						key={item}
						data-active={tab === item.toLowerCase()}
						disabled={tab === item.toLowerCase()}
						className="text-amber-500 hover:text-amber-300 cursor-pointer data-[active=true]:text-amber-200 transition-colors disabled:pointer-events-none"
						onClick={() => setTab(item.toLowerCase())}
					>
						{item}
					</button>
				))}
			</div>
			{children}
		</div>
	);
}
