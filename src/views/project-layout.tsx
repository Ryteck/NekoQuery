"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useProjectStore } from "@/stores/project";
import type ShowProjectByIdReturn from "@/types/ShowProjectByIdReturn";
import { usePathname, useRouter } from "next/navigation";
import { type PropsWithChildren, useEffect } from "react";

const projectFolders: Record<string, string> = {
	Project: "",
	Schemas: "/schemas",
	Playground: "/playground",
	Stats: "/stats",
	Console: "/console",
	Queries: "/queries",
	Members: "/members",
	Reports: "/reports",
	Settings: "/settings",
};

interface Props {
	project: ShowProjectByIdReturn;
}

export function ProjectLayoutView({
	project,
	children,
}: PropsWithChildren<Props>) {
	const baseUrl = `/projects/${project.id}`;
	const projectStore = useProjectStore();

	const pathName = usePathname();
	const router = useRouter();

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		projectStore.setProjet(project);
	}, [project]);

	return (
		<div className="flex gap-4 h-full">
			<Card className="h-fit">
				<CardContent className="flex flex-col">
					{Object.entries(projectFolders).map(([title, path]) => (
						<Button
							key={title}
							type="button"
							variant="link"
							disabled={pathName === `${baseUrl}${path}`}
							className="cursor-pointer"
							onClick={() => {
								router.push(`${baseUrl}${path}`);
							}}
						>
							{title}
						</Button>
					))}
				</CardContent>
			</Card>

			{projectStore.project && children}
		</div>
	);
}
