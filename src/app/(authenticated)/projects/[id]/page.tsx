"use client";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardAction,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { useProjectStore } from "@/stores/project";
import { SettingsIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Page() {
	const projectStore = useProjectStore();
	const project = projectStore.project;

	const router = useRouter();

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
