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

	useEffect(() => {
		projectStore.setProject(project);
	}, [project]);

	return children;
}
