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
import { LoaderIcon, MailIcon } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
	email: z.string().email({
		message: "Please enter a valid email address.",
	}),
});

type FormSchema = z.infer<typeof formSchema>;

export function EmailAccountFormComponent() {
	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
		},
	});

	const session = authClient.useSession();

	useEffect(() => {
		if (!session.isPending && session.data?.user) {
			form.setValue("email", session.data.user.email);
		}
	}, [session.isPending]);

	async function handleUpdateEmail(data: FormSchema) {
		const updatedUser = await authClient.changeEmail({ newEmail: data.email });

		if (updatedUser.error) {
			toast.error(updatedUser.error.message);
			return;
		}

		toast.success("Email Updated!");
	}

	return (
		<Form {...form}>
			<form
				className="flex flex-col gap-6"
				onSubmit={form.handleSubmit(handleUpdateEmail)}
			>
				{/* Email Field */}
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>

							<FormControl>
								<div className="relative">
									<MailIcon
										className="absolute top-2 left-2 text-foreground/50"
										size={20}
									/>

									<Input
										type="email"
										className="pl-9"
										placeholder="your@email.com"
										{...field}
									/>
								</div>
							</FormControl>

							<FormDescription>Enter your email address.</FormDescription>

							<FormMessage />
						</FormItem>
					)}
				/>

				{/* Submit Button */}
				<Button size="lg" type="submit" disabled={form.formState.isSubmitting}>
					{form.formState.isSubmitting ? (
						<LoaderIcon className="animate-spin" />
					) : (
						"Change email"
					)}
				</Button>
			</form>
		</Form>
	);
}
