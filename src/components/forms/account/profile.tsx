"use client";

import { Button } from "@/components/ui/button";
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
import { LoaderIcon, User2Icon } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
	name: z.string().nonempty({
		message: "Name is required.",
	}),
});

type FormSchema = z.infer<typeof formSchema>;

export function ProfileAccountFormComponent() {
	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
		},
	});

	const session = authClient.useSession();

	useEffect(() => {
		if (!session.isPending && session.data?.user) {
			form.setValue("name", session.data.user.name);
		}
	}, [session.isPending]);

	async function handleUpdateUser(data: FormSchema) {
		const updatedUser = await authClient.updateUser({ name: data.name });

		if (updatedUser.error) {
			toast.error(updatedUser.error.message);
			return;
		}

		toast.success("User Updated!");
	}

	return (
		<Form {...form}>
			<form
				className="flex flex-col gap-6"
				onSubmit={form.handleSubmit(handleUpdateUser)}
			>
				{/* Name Field */}
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Full Name</FormLabel>

							<FormControl>
								<div className="relative">
									<User2Icon
										className="absolute top-2 left-2 text-foreground/50"
										size={20}
									/>

									<Input className="pl-9" placeholder="John Doe" {...field} />
								</div>
							</FormControl>

							<FormDescription>Enter your full name.</FormDescription>

							<FormMessage />
						</FormItem>
					)}
				/>

				{/* Submit Button */}
				<Button size="lg" type="submit" disabled={form.formState.isSubmitting}>
					{form.formState.isSubmitting ? (
						<LoaderIcon className="animate-spin" />
					) : (
						"Save profile"
					)}
				</Button>
			</form>
		</Form>
	);
}
