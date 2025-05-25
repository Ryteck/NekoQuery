"use client";

import GithubMarkWhite from "@/assets/github-mark-white.svg";
import ButtonComponent from "@/components/ui/button";
import * as InputUiComponent from "@/components/ui/input";
import {
	EllipsisIcon,
	GitMergeIcon,
	LayoutGridIcon,
	PlusIcon,
	SearchIcon,
	TrendingUpIcon,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function Page() {
	const [projectsCount, setProjectsCount] = useState(0);

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
						/>
					</InputUiComponent.Core>
				</InputUiComponent.Root>

				<ButtonComponent
					onClick={() => {
						setProjectsCount(projectsCount + 1);
					}}
				>
					<PlusIcon />
				</ButtonComponent>
			</div>
			<div className="grid grid-cols-[repeat(auto-fill,_minmax(320px,_1fr))] gap-6">
				{Array.from({ length: projectsCount }, (v, k) => k).map((arg) => (
					<div
						key={String(arg)}
						className="border p-6 flex flex-col gap-4 rounded-lg bg-neutral-800 border-neutral-500 cursor-pointer hover:border-neutral-300"
						onClick={() => {
							alert(`Project ${arg}`);
						}}
						onKeyDown={() => {}}
					>
						<div className="flex gap-4">
							<div className="w-full flex gap-2 items-center">
								<LayoutGridIcon size={32} />

								<div className="flex flex-col text-sm">
									<h3>Project {arg}</h3>
									<span>/app/project/{arg}</span>
								</div>
							</div>

							<div className="flex gap-2 items-center">
								<div className="w-8 h-8 border rounded-full p-2 flex items-center justify-center">
									<TrendingUpIcon />
								</div>

								<button
									type="button"
									className="transition-colors cursor-pointer w-6 h-6 text-neutral-300 hover:text-neutral-50 hover:bg-neutral-700 rounded"
									onClick={(e) => {
										e.stopPropagation();
										alert(`Options ${arg}`);
									}}
								>
									<EllipsisIcon />
								</button>
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
