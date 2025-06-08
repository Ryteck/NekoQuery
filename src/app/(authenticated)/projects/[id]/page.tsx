"use client";

import { useProjectStore } from "@/stores/project";

export default function Page() {
	const projectStore = useProjectStore();

	return (
		<div className="flex flex-col gap-2">
			<h3>Project:</h3>

			<pre>
				<code>{JSON.stringify(projectStore.project, null, 2)}</code>
			</pre>
		</div>
	);
}
