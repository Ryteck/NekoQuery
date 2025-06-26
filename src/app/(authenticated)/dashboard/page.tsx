"use client";

import { deleteProjectByIdAction } from "@/actions/deleteProjectById";
import { listProjectsByUserIdAction } from "@/actions/listProjectsByUserId";
import GithubMarkWhite from "@/assets/github-mark-white.svg";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import type { ProjectData } from "@/db/schema/project";
import { getDiffInHoursText } from "@/lib/utils";
import { useNavigationStore } from "@/stores/navigation";
import {
	ArrowRightIcon,
	EllipsisIcon,
	GitMergeIcon,
	PlusIcon,
	SearchIcon,
	SearchXIcon,
	TrashIcon,
	TrendingUpIcon,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
	const [projects, setProjects] = useState<ProjectData[]>([]);
	const [filter, setFilter] = useState("");
	const [isLoading, setIsLoading] = useState(true);

	const [selectedProjectIdForDelete, setSelectedProjectIdForDelete] =
		useState("");

	const router = useRouter();

	async function loadProjects() {
		const projects = await listProjectsByUserIdAction();
		if (projects?.data) setProjects(projects.data);
	}

	const navigationStore = useNavigationStore();

	useEffect(() => {
		loadProjects().finally(() => setIsLoading(false));
		navigationStore.setCurrentPage("Dashboard");
	}, []);

	const filteredProjects = projects.filter((arg) =>
		arg.name.toLowerCase().includes(filter.toLowerCase()),
	);

	return (
		<div className="flex flex-col gap-8">
			<div className="flex gap-4 items-center">
				<div className="relative w-full">
					<SearchIcon
						className="absolute top-2 left-2 text-foreground/50"
						size={20}
					/>

					<Input
						type="email"
						className="pl-9"
						placeholder="Search..."
						value={filter}
						onChange={(e) => setFilter(e.target.value)}
					/>
				</div>

				<Button
					size="icon"
					onClick={() => {
						router.push("/projects");
					}}
				>
					<PlusIcon />
				</Button>
			</div>

			{filteredProjects.length === 0 && !isLoading && (
				<Alert>
					<SearchXIcon />
					<AlertTitle>No projects available</AlertTitle>
					<AlertDescription>
						No projects were found. Please check if any projects have been
						created or try adjusting the applied filters.
					</AlertDescription>
				</Alert>
			)}

			<div className="grid grid-cols-[repeat(auto-fill,_minmax(320px,_1fr))] gap-6">
				{filteredProjects
					.sort((a, b) => a.name.localeCompare(b.name))
					.map((arg) => (
						<Card key={arg.id}>
							<CardHeader>
								<CardTitle className="truncate">{arg.name}</CardTitle>

								<CardDescription className="truncate">
									projects/{arg.id}
								</CardDescription>

								<CardAction className="pl-4 flex gap-2 items-center">
									<div className="w-8 h-8 border rounded-full p-2 flex items-center justify-center">
										<TrendingUpIcon />
									</div>

									<DropdownMenu>
										<DropdownMenuTrigger asChild>
											<Button size="icon" variant="outline" type="button">
												<EllipsisIcon />
											</Button>
										</DropdownMenuTrigger>

										<DropdownMenuContent>
											<DropdownMenuLabel>Project options</DropdownMenuLabel>

											<DropdownMenuItem
												onClick={() => {
													router.push(`/projects/${arg.id}`);
												}}
											>
												Access
												<DropdownMenuShortcut>
													<ArrowRightIcon />
												</DropdownMenuShortcut>
											</DropdownMenuItem>

											<DropdownMenuItem
												variant="destructive"
												onClick={() => {
													setSelectedProjectIdForDelete(arg.id);
												}}
											>
												Delete
												<DropdownMenuShortcut>
													<TrashIcon />
												</DropdownMenuShortcut>
											</DropdownMenuItem>
										</DropdownMenuContent>
									</DropdownMenu>

									<AlertDialog
										open={selectedProjectIdForDelete !== ""}
										onOpenChange={(open) => {
											if (!open) {
												setSelectedProjectIdForDelete("");
											}
										}}
									>
										<AlertDialogContent>
											<AlertDialogHeader>
												<AlertDialogTitle>
													Are you sure you want to delete this project?
												</AlertDialogTitle>
												<AlertDialogDescription>
													This action is irreversible. The project will be
													permanently removed and all associated data will be
													lost.
												</AlertDialogDescription>
											</AlertDialogHeader>
											<AlertDialogFooter>
												<AlertDialogCancel>Cancel</AlertDialogCancel>
												<AlertDialogAction
													onClick={async () => {
														await deleteProjectByIdAction(
															selectedProjectIdForDelete,
														);

														await loadProjects();
													}}
												>
													Continue
												</AlertDialogAction>
											</AlertDialogFooter>
										</AlertDialogContent>
									</AlertDialog>
								</CardAction>
							</CardHeader>
							<CardContent>
								<Badge className="py-1.5 px-3">
									<Image
										alt="GitHub Logo"
										width={20}
										height={20}
										src={GithubMarkWhite}
									/>
									Ryteck/NekoQuery
								</Badge>
							</CardContent>
							<CardFooter className="flex flex-col text-muted-foreground text-sm">
								<p className="w-full">qwerty</p>

								<p className="w-full flex gap-1 items-center">
									{getDiffInHoursText(arg.createdAt)} on{" "}
									<GitMergeIcon size={16} />
									main
								</p>
							</CardFooter>
						</Card>
					))}
			</div>
		</div>
	);
}
