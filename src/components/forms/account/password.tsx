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
import { EyeIcon, EyeOffIcon, LoaderIcon, LockIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z
	.object({
		currentPassword: z.string().min(8, {
			message: "Password must be at least 8 characters long.",
		}),
		newPassword: z.string().min(8, {
			message: "Password must be at least 8 characters long.",
		}),
		confirmPassword: z.string().min(8, {
			message: "Please confirm your password (minimum 8 characters).",
		}),
	})
	.refine((arg) => arg.newPassword === arg.confirmPassword, {
		message: "Passwords do not match.",
		path: ["confirmPassword"],
	});

type FormSchema = z.infer<typeof formSchema>;

export function PasswordAccountFormComponent() {
	const [showPassword, setShowPassword] = useState(false);

	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			currentPassword: "",
			newPassword: "",
			confirmPassword: "",
		},
	});

	async function handleUpdateEmail(data: FormSchema) {
		const updatedUser = await authClient.changePassword({
			currentPassword: data.currentPassword,
			newPassword: data.newPassword,
		});

		if (updatedUser.error) {
			toast.error(updatedUser.error.message);
			return;
		}

		toast.success("Password Updated!");
	}

	return (
		<Form {...form}>
			<form
				className="flex flex-col gap-6"
				onSubmit={form.handleSubmit(handleUpdateEmail)}
			>
				{/* Current Password Field */}
				<FormField
					control={form.control}
					name="currentPassword"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Current Password</FormLabel>

							<FormControl>
								<div className="relative">
									<LockIcon
										className="absolute top-2 left-2 text-foreground/50"
										size={20}
									/>

									<Input
										type={showPassword ? "text" : "password"}
										className="pl-9 pr-9"
										placeholder="••••••••"
										{...field}
									/>

									<Button
										type="button"
										className="absolute top-0 right-0"
										size="icon"
										variant="ghost"
										onClick={() => setShowPassword((state) => !state)}
									>
										{showPassword ? (
											<EyeIcon size={18} />
										) : (
											<EyeOffIcon size={18} />
										)}
									</Button>
								</div>
							</FormControl>

							<FormDescription>Create a secure password.</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* New Password Field */}
				<FormField
					control={form.control}
					name="newPassword"
					render={({ field }) => (
						<FormItem>
							<FormLabel>New Password</FormLabel>

							<FormControl>
								<div className="relative">
									<LockIcon
										className="absolute top-2 left-2 text-foreground/50"
										size={20}
									/>

									<Input
										type={showPassword ? "text" : "password"}
										className="pl-9 pr-9"
										placeholder="••••••••"
										{...field}
									/>

									<Button
										type="button"
										className="absolute top-0 right-0"
										size="icon"
										variant="ghost"
										onClick={() => setShowPassword((state) => !state)}
									>
										{showPassword ? (
											<EyeIcon size={18} />
										) : (
											<EyeOffIcon size={18} />
										)}
									</Button>
								</div>
							</FormControl>

							<FormDescription>Create a secure password.</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/*  Confirm Password Field */}
				<FormField
					control={form.control}
					name="confirmPassword"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Confirm Password</FormLabel>

							<FormControl>
								<div className="relative">
									<LockIcon
										className="absolute top-2 left-2 text-foreground/50"
										size={20}
									/>

									<Input
										type={showPassword ? "text" : "password"}
										className="pl-9 pr-9"
										placeholder="••••••••"
										{...field}
									/>

									<Button
										type="button"
										className="absolute top-0 right-0"
										size="icon"
										variant="ghost"
										onClick={() => setShowPassword((state) => !state)}
									>
										{showPassword ? (
											<EyeIcon size={18} />
										) : (
											<EyeOffIcon size={18} />
										)}
									</Button>
								</div>
							</FormControl>

							<FormDescription>Repeat the password to confirm.</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* Submit Button */}
				<Button size="lg" type="submit" disabled={form.formState.isSubmitting}>
					{form.formState.isSubmitting ? (
						<LoaderIcon className="animate-spin" />
					) : (
						"Change password"
					)}
				</Button>
			</form>
		</Form>
	);
}
