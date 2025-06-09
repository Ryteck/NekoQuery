"use client";

import { useProjectStore } from "@/stores/project";
import type ShowProjectByIdReturn from "@/types/ShowProjectByIdReturn";
import { type PropsWithChildren, useEffect } from "react";

interface Props {
	project: ShowProjectByIdReturn;
}

export function ProjectLayoutView({
	project,
	children,
}: PropsWithChildren<Props>) {
	const projectStore = useProjectStore();

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		projectStore.setProjet(project);
	}, [project]);

	return children;
}
