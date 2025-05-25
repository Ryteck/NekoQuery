"use client";

import { createProjectAction } from "@/actions/createProject";
import ButtonComponent from "@/components/ui/button";
import * as InputUiComponent from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { FolderRootIcon, LoaderIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
	name: z.string().nonempty({
		message: "Name is required.",
	}),
});

type FormSchema = z.infer<typeof formSchema>;

export default function Page() {
	const form = useForm({
		resolver: zodResolver(formSchema),
	});

	const router = useRouter();

	async function handleCreateProject(data: FormSchema) {
		await createProjectAction(data);
		router.push("/dashboard");
	}

	return (
		<div className="flex gap-8 bg-neutral-800 rounded-2xl p-8 mx-auto w-fit">
			{/* Sign Up Form */}
			<form
				className="mx-auto flex flex-col gap-6 min-w-[480px]"
				onSubmit={form.handleSubmit(handleCreateProject)}
			>
				<h3 className="text-2xl">Sign Up</h3>
				<p className="text-sm">
					Complete the fields below to set up your new account
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
