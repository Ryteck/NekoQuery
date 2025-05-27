"use client";

import { createProjectAction } from "@/actions/createProject";
import ButtonComponent from "@/components/ui/button";
import * as InputUiComponent from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	FolderRootIcon,
	IdCardIcon,
	LoaderIcon,
	RefreshCwIcon,
} from "lucide-react";
import { nanoid } from "nanoid";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
	name: z.string().nonempty({
		message: "Name is required.",
	}),

	nanoid: z.string().nonempty({
		message: "Nanoid is required.",
	}),
});

type FormSchema = z.infer<typeof formSchema>;

export default function Page() {
	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			nanoid: nanoid(),
		},
	});

	const router = useRouter();

	async function handleCreateProject(data: FormSchema) {
		const project = await createProjectAction(data);

		if (project?.data) router.push(`/projects/${project.data.id}`);
	}

	return (
		<div className="flex gap-8 bg-neutral-800 rounded-2xl p-8 mx-auto w-fit">
			{/* Sign Up Form */}
			<form
				className="mx-auto flex flex-col gap-6 min-w-[480px]"
				onSubmit={form.handleSubmit(handleCreateProject)}
			>
				<h3 className="text-2xl">Create Project</h3>
				<p className="text-sm">
					Fill out the details below to create a new project.
				</p>

				{/* Project Name Field */}
				<InputUiComponent.Root>
					<InputUiComponent.Label
						htmlFor="input-name"
						variants={{ error: !!form.formState.errors.name }}
					>
						Project Name
					</InputUiComponent.Label>
					<InputUiComponent.Core>
						<InputUiComponent.PrefixIcon>
							<FolderRootIcon size={18} />
						</InputUiComponent.PrefixIcon>

						<InputUiComponent.Input
							id="input-name"
							placeholder="Neko Query"
							variants={{ withPrefixIcon: true }}
							{...form.register("name")}
						/>
					</InputUiComponent.Core>

					<InputUiComponent.ErrorMessage>
						{form.formState.errors.name?.message}
					</InputUiComponent.ErrorMessage>
				</InputUiComponent.Root>

				{/* Project Nanoid Field */}
				<InputUiComponent.Root>
					<InputUiComponent.Label
						htmlFor="input-nanoid"
						variants={{ error: !!form.formState.errors.nanoid }}
					>
						Project Nanoid
					</InputUiComponent.Label>
					<InputUiComponent.Core>
						<InputUiComponent.PrefixIcon>
							<IdCardIcon size={18} />
						</InputUiComponent.PrefixIcon>

						<InputUiComponent.Input
							id="input-nanoid"
							placeholder="Neko Query"
							variants={{
								withPrefixIcon: true,
								withActionIcon: true,
							}}
							disabled
							{...form.register("nanoid")}
						/>

						<InputUiComponent.ActionIcon
							onClick={() => {
								form.setValue("nanoid", nanoid());
							}}
						>
							<RefreshCwIcon size={18} />
						</InputUiComponent.ActionIcon>
					</InputUiComponent.Core>

					<InputUiComponent.ErrorMessage>
						{form.formState.errors.nanoid?.message}
					</InputUiComponent.ErrorMessage>
				</InputUiComponent.Root>

				{/* Submit Button */}
				<ButtonComponent type="submit" disabled={form.formState.isSubmitting}>
					{form.formState.isSubmitting ? (
						<LoaderIcon className="animate-spin" />
					) : (
						"Create project"
					)}
				</ButtonComponent>
			</form>
		</div>
	);
}
