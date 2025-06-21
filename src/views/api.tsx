"use client";

import type { ApiData } from "@/db/schema/api";
import { useNavigationStore } from "@/stores/navigation";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

interface Props {
	api: ApiData;
}

export function ApiView({ api }: Props) {
	const navigationStore = useNavigationStore();
	const pathname = usePathname();

	useEffect(() => {
		navigationStore.setSubPages([{ title: "API List", url: "/apis/list" }]);

		navigationStore.setCurrentPage(api.name);
	}, [pathname]);

	return (
		<div className="flex flex-col gap-2">
			<h3>API:</h3>

			<pre>
				<code>{JSON.stringify(api, null, 2)}</code>
			</pre>
		</div>
	);
}
