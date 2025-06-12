"use client";

import GithubMarkWhite from "@/assets/github-mark-white.svg";
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
import { authClient } from "@/lib/auth-client";
import {
	ArrowRightIcon,
	EllipsisIcon,
	GitMergeIcon,
	PlusIcon,
	SearchIcon,
	TrashIcon,
	TrendingUpIcon,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Page() {
	const organizations = authClient.useListOrganizations();
	const [filter, setFilter] = useState("");

	const [selectedOrganizationIdForDelete, setSelectedOrganizationIdForDelete] =
		useState("");

	const router = useRouter();

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
						router.push("/organizations");
					}}
				>
					<PlusIcon />
				</Button>
			</div>
			<div className="grid grid-cols-[repeat(auto-fill,_minmax(320px,_1fr))] gap-6">
				{organizations.data
					?.filter((arg) =>
						arg.name.toLowerCase().includes(filter.toLowerCase()),
					)
					.map((arg) => (
						<Card key={arg.id}>
							<CardHeader>
								<CardTitle className="truncate">{arg.name}</CardTitle>

								<CardDescription className="truncate">
									organizations/{arg.id}
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
											<DropdownMenuLabel>
												Organization options
											</DropdownMenuLabel>

											<DropdownMenuItem
												onClick={() => {
													router.push(`/organizations/${arg.id}`);
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
													setSelectedOrganizationIdForDelete(arg.id);
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
										open={selectedOrganizationIdForDelete !== ""}
										onOpenChange={(open) => {
											if (!open) {
												setSelectedOrganizationIdForDelete("");
											}
										}}
									>
										<AlertDialogContent>
											<AlertDialogHeader>
												<AlertDialogTitle>
													Are you sure you want to delete this organization?
												</AlertDialogTitle>
												<AlertDialogDescription>
													This action is irreversible. The organization will be
													permanently removed and all associated data will be
													lost.
												</AlertDialogDescription>
											</AlertDialogHeader>
											<AlertDialogFooter>
												<AlertDialogCancel>Cancel</AlertDialogCancel>
												<AlertDialogAction
													onClick={async () => {
														authClient.organization.delete({
															organizationId: selectedOrganizationIdForDelete,
														});
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
