"use client";

import { createProjectAction } from "@/actions/createProject";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
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
			name: "",
			nanoid: nanoid(),
		},
	});

	const router = useRouter();

	async function handleCreateProject(data: FormSchema) {
		const project = await createProjectAction(data);

		if (project?.data) router.push(`/projects/${project.data.id}`);
	}

	return (
		<Card className="w-fit mx-auto">
			<CardHeader>
				<CardTitle>Create Project</CardTitle>
				<CardDescription>
					Fill out the details below to create a new project.
				</CardDescription>
			</CardHeader>

			<CardContent>
				{/* Sign Up Form */}
				<Form {...form}>
					<form
						className="mx-auto flex flex-col gap-6 min-w-[480px]"
						onSubmit={form.handleSubmit(handleCreateProject)}
					>
						{/* Project Name Field */}
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Project Name</FormLabel>

									<FormControl>
										<div className="relative">
											<FolderRootIcon
												className="absolute top-2 left-2 text-input"
												size={20}
											/>

											<Input
												className="pl-9"
												placeholder="Neko Query"
												{...field}
											/>
										</div>
									</FormControl>

									<FormDescription>
										Choose a name to identify your project.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>

						{/* Project Nanoid Field */}
						<FormField
							control={form.control}
							name="nanoid"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Project Nanoid</FormLabel>

									<FormControl>
										<div className="relative">
											<IdCardIcon
												className="absolute top-2 left-2 text-input"
												size={20}
											/>

											<Input className="pl-9 pr-9" disabled {...field} />

											<Button
												type="button"
												className="absolute top-0 right-0"
												size="icon"
												variant="ghost"
												onClick={() => {
													form.setValue("nanoid", nanoid());
												}}
											>
												<RefreshCwIcon />
											</Button>
										</div>
									</FormControl>

									<FormDescription>
										Unique project ID used internally. Click the icon to
										generate a new one.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>

						{/* Submit Button */}
						<Button
							size="lg"
							type="submit"
							disabled={form.formState.isSubmitting}
						>
							{form.formState.isSubmitting ? (
								<LoaderIcon className="animate-spin" />
							) : (
								"Create project"
							)}
						</Button>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}
