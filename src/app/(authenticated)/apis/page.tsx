"use client";

import { createApiAction } from "@/actions/createApi";
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
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { authClient } from "@/lib/auth-client";
import { useNavigationStore } from "@/stores/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { AppWindowMacIcon, GlobeIcon, LoaderIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
	name: z.string().nonempty({
		message: "Name is required.",
	}),

	baseUrl: z.string().url().nonempty().nullable(),

	organizationId: z
		.string()
		.nonempty({
			message: "Organization is required.",
		})
		.nullable(),
});

type FormSchema = z.infer<typeof formSchema>;

export default function Page() {
	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			baseUrl: "",
			organizationId: "",
		},
	});

	const router = useRouter();

	async function handleCreateApi(data: FormSchema) {
		const api = await createApiAction(data);

		if (api?.data) router.push(`/apis/${api.data.id}`);
	}

	const organizations = authClient.useListOrganizations();

	const navigationStore = useNavigationStore();

	useEffect(() => {
		navigationStore.setCurrentPage("Create New API");
	}, []);

	return (
		<Card className="mx-auto w-full lg:max-w-[480px]">
			<CardHeader>
				<CardTitle>Create API</CardTitle>
				<CardDescription>
					Fill out the details below to create a new API.
				</CardDescription>
			</CardHeader>

			<CardContent>
				{/* Form */}
				<Form {...form}>
					<form
						className="flex flex-col gap-6"
						onSubmit={form.handleSubmit(handleCreateApi)}
					>
						{/* API Name Field */}
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>API Name</FormLabel>

									<FormControl>
										<div className="relative">
											<AppWindowMacIcon
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
										Choose a name to identify your API.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>

						{/* API baseUrl Field */}
						<FormField
							control={form.control}
							name="baseUrl"
							render={({ field }) => (
								<FormItem>
									<FormLabel>API Base URL</FormLabel>

									<FormControl>
										<div className="relative">
											<GlobeIcon
												className="absolute top-2 left-2 text-foreground/50"
												size={20}
											/>

											<Input
												className="pl-9"
												placeholder="https://neko-query.vercel.app/api"
												value={field.value ?? ""}
												onChange={field.onChange}
												name={field.name}
												disabled={field.value === null}
											/>
										</div>
									</FormControl>

									<FormDescription>
										Choose a name to identify your API.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
							<div className="space-y-0.5">
								<FormLabel>Use a custom Base URL</FormLabel>
								<FormDescription>
									Enable this to provide your own API endpoint.
								</FormDescription>
							</div>
							<FormControl>
								<Switch
									checked={form.watch().baseUrl !== null}
									onCheckedChange={(arg) => {
										form.setValue("baseUrl", arg ? "" : null);
										form.clearErrors("baseUrl");
									}}
								/>
							</FormControl>
						</FormItem>

						{/* API Organization Field */}
						<FormField
							control={form.control}
							name="organizationId"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Organization</FormLabel>
									<Select
										defaultValue={field.value === null ? "empty" : field.value}
										onValueChange={(arg) =>
											field.onChange(arg === "empty" ? null : arg)
										}
									>
										<FormControl>
											<SelectTrigger className="w-full">
												<SelectValue placeholder="Select an organization or use personal" />
											</SelectTrigger>
										</FormControl>

										<SelectContent>
											<SelectItem value="empty">
												No organization linked (personal use)
											</SelectItem>

											{(organizations.data?.length ?? 0) > 0 && (
												<SelectGroup>
													<SelectLabel>Organizations</SelectLabel>

													{/* List of available organizations */}
													{organizations.data
														?.sort((a, b) => a.name.localeCompare(b.name))
														.map((arg) => (
															<SelectItem key={arg.id} value={arg.id}>
																{arg.name}
															</SelectItem>
														))}
												</SelectGroup>
											)}
										</SelectContent>
									</Select>

									<FormDescription>
										This organization will be linked to the registered API.
										Select "No organization linked" for personal use.
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
								"Create API"
							)}
						</Button>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}
