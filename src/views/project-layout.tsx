"use client";

import { useNavigationStore } from "@/stores/navigation";
import { useProjectStore } from "@/stores/project";
import type ShowProjectByIdReturn from "@/types/ShowProjectByIdReturn";
import { usePathname } from "next/navigation";
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

	const navigationStore = useNavigationStore();
	const pathname = usePathname();

	useEffect(() => {
		navigationStore.setSubPages([
			{ title: "Dashboard", url: "/dashboard" },
			{ title: project.name, url: `/projects/${project.id}` },
		]);
	}, [pathname]);

	return children;
}
