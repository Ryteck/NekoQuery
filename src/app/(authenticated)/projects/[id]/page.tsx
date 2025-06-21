"use client";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardAction,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { useNavigationStore } from "@/stores/navigation";
import { useProjectStore } from "@/stores/project";
import { SettingsIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
	const projectStore = useProjectStore();
	const project = projectStore.project;

	const router = useRouter();

	const navigationStore = useNavigationStore();
	const pathname = usePathname();

	useEffect(() => {
		if (project?.name) {
			navigationStore.setSubPages([{ title: "Dashboard", url: "/dashboard" }]);
			navigationStore.setCurrentPage(project?.name);
		}
	}, [pathname]);

	return (
		<Card>
			<CardHeader>
				<CardTitle>Project</CardTitle>
				<CardDescription>{project?.name}</CardDescription>
				<CardAction>
					<Button
						size="icon"
						variant="outline"
						type="button"
						onClick={() => {
							router.push(`/projects/${project?.id}/settings`);
						}}
					>
						<SettingsIcon />
					</Button>
				</CardAction>
			</CardHeader>
		</Card>
	);
}
