"use client";

import { deleteApiByIdAction } from "@/actions/deleteApiById";
import { listApisByUserIdAction } from "@/actions/listApisByUserId";
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
import type { ApiData } from "@/db/schema/api";
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
	const [apis, setApis] = useState<ApiData[]>([]);
	const [filter, setFilter] = useState("");
	const [isLoading, setIsLoading] = useState(true);

	const [selectedApiIdForDelete, setSelectedApiIdForDelete] = useState("");

	const router = useRouter();

	async function loadApis() {
		const apis = await listApisByUserIdAction();
		if (apis?.data) setApis(apis.data);
	}

	const navigationStore = useNavigationStore();

	useEffect(() => {
		loadApis().finally(() => setIsLoading(false));

		navigationStore.setCurrentPage("API List");
	}, []);

	const filteredApis = apis.filter((arg) =>
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
						router.push("/apis");
					}}
				>
					<PlusIcon />
				</Button>
			</div>

			{filteredApis.length === 0 && !isLoading && (
				<Alert>
					<SearchXIcon />
					<AlertTitle>No apis available</AlertTitle>
					<AlertDescription>
						No apis were found. Please check if any apis have been created or
						try adjusting the applied filters.
					</AlertDescription>
				</Alert>
			)}

			<div className="grid grid-cols-[repeat(auto-fill,_minmax(320px,_1fr))] gap-6">
				{filteredApis
					.sort((a, b) => a.name.localeCompare(b.name))
					.map((arg) => (
						<Card key={arg.id}>
							<CardHeader>
								<CardTitle className="truncate">{arg.name}</CardTitle>

								<CardDescription className="truncate">
									apis/{arg.id}
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
											<DropdownMenuLabel>Api options</DropdownMenuLabel>

											<DropdownMenuItem
												onClick={() => {
													router.push(`/apis/${arg.id}`);
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
													setSelectedApiIdForDelete(arg.id);
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
										open={selectedApiIdForDelete !== ""}
										onOpenChange={(open) => {
											if (!open) {
												setSelectedApiIdForDelete("");
											}
										}}
									>
										<AlertDialogContent>
											<AlertDialogHeader>
												<AlertDialogTitle>
													Are you sure you want to delete this api?
												</AlertDialogTitle>
												<AlertDialogDescription>
													This action is irreversible. The api will be
													permanently removed and all associated data will be
													lost.
												</AlertDialogDescription>
											</AlertDialogHeader>
											<AlertDialogFooter>
												<AlertDialogCancel>Cancel</AlertDialogCancel>
												<AlertDialogAction
													onClick={async () => {
														await deleteApiByIdAction(selectedApiIdForDelete);

														await loadApis();
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
									xh ago on
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
