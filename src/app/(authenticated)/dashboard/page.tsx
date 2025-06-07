"use client";

import { listProjectsByUserIdAction } from "@/actions/listProjectsByUserId";
import GithubMarkWhite from "@/assets/github-mark-white.svg";
import * as InputUiComponent from "@/components/custom-ui/input";
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
import type { ProjectData } from "@/db/schema/project";
import {
	EllipsisIcon,
	GitMergeIcon,
	PlusIcon,
	SearchIcon,
	TrendingUpIcon,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
	const [projects, setProjects] = useState<ProjectData[]>([]);
	const [filter, setFilter] = useState("");
	const router = useRouter();

	useEffect(() => {
		listProjectsByUserIdAction().then((arg) => {
			if (arg?.data) setProjects(arg.data);
		});
	}, []);

	return (
		<div className="flex flex-col gap-8">
			<div className="flex gap-4 items-center">
				<InputUiComponent.Root className="w-full">
					<InputUiComponent.Core>
						<InputUiComponent.PrefixIcon>
							<SearchIcon size={18} />
						</InputUiComponent.PrefixIcon>

						<InputUiComponent.Input
							className="bg-neutral-800"
							placeholder="Search..."
							variants={{ withPrefixIcon: true }}
							value={filter}
							onChange={(e) => setFilter(e.target.value)}
						/>
					</InputUiComponent.Core>
				</InputUiComponent.Root>

				<Button
					size="icon"
					onClick={() => {
						router.push("/projects");
					}}
				>
					<PlusIcon />
				</Button>
			</div>
			<div className="grid grid-cols-[repeat(auto-fill,_minmax(320px,_1fr))] gap-6">
				{projects
					.filter((arg) =>
						arg.name.toLowerCase().includes(filter.toLowerCase()),
					)
					.map((arg) => (
						<Card
							key={arg.id}
							className="cursor-pointer hover:shadow-lg hover:border-neutral-500 transition-all"
							onClick={() => {
								router.push(`/projects/${arg.id}`);
							}}
						>
							<CardHeader>
								<CardTitle className="truncate">{arg.name}</CardTitle>

								<CardDescription className="truncate">
									/app/project/{arg.id}
								</CardDescription>

								<CardAction className="pl-4 flex gap-2 items-center">
									<div className="w-8 h-8 border rounded-full p-2 flex items-center justify-center">
										<TrendingUpIcon />
									</div>

									<Button
										size="icon"
										variant="outline"
										type="button"
										onClick={(e) => {
											e.stopPropagation();
											alert(`Options ${arg.name}`);
										}}
									>
										<EllipsisIcon />
									</Button>
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
