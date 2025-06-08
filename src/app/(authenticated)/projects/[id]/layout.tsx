import { showProjectById } from "@/repositories/project";
import { ProjectLayoutView } from "@/views/project-layout";
import type { PropsWithChildren } from "react";

interface Params {
	id: string;
}

interface Props {
	params: Promise<Params>;
}

export default async function Layout({
	children,
	...props
}: PropsWithChildren<Props>) {
	const params = await props.params;

	const project = await showProjectById(params.id);

	return <ProjectLayoutView project={project}>{children}</ProjectLayoutView>;
}
