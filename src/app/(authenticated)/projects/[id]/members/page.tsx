"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import UserAvatarComponent from "@/components/user-avatar";
import { useProjectStore } from "@/stores/project";
import { EllipsisIcon, ExternalLinkIcon } from "lucide-react";

export default function Page() {
	const projectStore = useProjectStore();
	const project = projectStore.project;

	return (
		<Card>
			<CardHeader>
				<CardTitle>Members</CardTitle>
				<CardDescription>{project?.name}</CardDescription>
				<CardAction>
					<Button size="icon" variant="outline" type="button">
						<EllipsisIcon />
					</Button>
				</CardAction>
			</CardHeader>

			<CardContent>
				<Table>
					<TableCaption>List of active members.</TableCaption>
					<TableHeader>
						<TableRow>
							<TableHead className="text-center w-12">#</TableHead>
							<TableHead>Name</TableHead>
							<TableHead>E-Mail</TableHead>
							<TableHead className="text-center">Role</TableHead>
							<TableHead className="text-right">Access</TableHead>
						</TableRow>
					</TableHeader>

					<TableBody>
						{project?.members.map((arg) => (
							<TableRow key={arg.id}>
								<TableCell>
									<UserAvatarComponent />
								</TableCell>

								<TableCell>{arg.userName}</TableCell>
								<TableCell>{arg.userEmail}</TableCell>

								<TableCell className="text-center">
									<Badge>{arg.role}</Badge>
								</TableCell>

								<TableCell className="text-right">
									<Button size="icon" variant="outline">
										<ExternalLinkIcon />
									</Button>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	);
}
