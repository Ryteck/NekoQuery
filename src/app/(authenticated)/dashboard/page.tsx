"use client";

import { listProjectsByUserIdAction } from "@/actions/listProjectsByUserId";
import GithubMarkWhite from "@/assets/github-mark-white.svg";
import * as InputUiComponent from "@/components/custom-ui/input";
import { Button } from "@/components/ui/button";
import type { ProjectData } from "@/db/schema/project";
import {
	EllipsisIcon,
	GitMergeIcon,
	LayoutGridIcon,
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
						<div
							key={arg.id}
							className="border p-6 flex flex-col gap-4 rounded-lg bg-neutral-800 border-neutral-500 cursor-pointer hover:border-neutral-300"
							onClick={() => {
								router.push(`/projects/${arg.id}`);
							}}
							onKeyDown={() => {}}
						>
							<div className="flex gap-4">
								<div className="w-full flex gap-2 items-center">
									<LayoutGridIcon size={32} />

									<div className="flex flex-col text-sm">
										<h3 className="max-w-36 truncate">{arg.name}</h3>
										<span className="max-w-36 truncate">
											/app/project/{arg.id}
										</span>
									</div>
								</div>

								<div className="flex gap-2 items-center">
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
								</div>
							</div>

							<div className="h-fit flex items-center gap-2 bg-neutral-950 w-fit py-1.5 px-3 text-sm rounded-full">
								<Image
									alt="GitHub Logo"
									width={20}
									height={20}
									src={GithubMarkWhite}
								/>
								Ryteck/NekoQuery
							</div>

							<div className="flex flex-col text-sm text-neutral-400">
								<p className="w-full">qwerty</p>

								<p className="w-full flex gap-1 items-center">
									xh ago on
									<GitMergeIcon size={16} />
									main
								</p>
							</div>
						</div>
					))}
			</div>
		</div>
	);
}
