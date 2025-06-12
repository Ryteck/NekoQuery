"use client";

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
import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Building, LoaderIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import slug from "slug";
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
		defaultValues: {
			name: "",
		},
	});

	const router = useRouter();

	async function handleCreateOrganization(data: FormSchema) {
		const timestamp = Date.now();
		const timestamp36 = timestamp.toString(36);

		const slugWithTimestamp = `${timestamp36}_${slug(data.name)}`;

		const organization = await authClient.organization.create({
			...data,
			slug: slugWithTimestamp,
		});

		if (organization.error) {
			alert(organization.error.message);
			return;
		}

		await authClient.organization.setActive({
			organizationId: organization.data.id,
		});

		router.push("/dashboard");
	}

	return (
		<Card className="w-fit mx-auto">
			<CardHeader>
				<CardTitle>Create Organization</CardTitle>
				<CardDescription>
					Fill out the details below to create a new organization.
				</CardDescription>
			</CardHeader>

			<CardContent>
				{/* Sign Up Form */}
				<Form {...form}>
					<form
						className="mx-auto flex flex-col gap-6 w-full lg:max-w-[480px]"
						onSubmit={form.handleSubmit(handleCreateOrganization)}
					>
						{/* Project Name Field */}
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Organization Name</FormLabel>

									<FormControl>
										<div className="relative">
											<Building
												className="absolute top-2 left-2 text-foreground/50"
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
										Choose a name to identify your organization.
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
