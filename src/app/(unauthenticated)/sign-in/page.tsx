"use client";

import SignInTemplateAsset from "@/assets/sign-in-template.jpg";
import * as InputUiComponent from "@/components/custom-ui/input";
import SocialLoginComponent from "@/components/social-login";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	EyeIcon,
	EyeOffIcon,
	LoaderIcon,
	LockIcon,
	MailIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
	email: z.string().email({
		message: "Please enter a valid email address.",
	}),
	password: z.string().min(8, {
		message: "Password must be at least 8 characters long.",
	}),
	rememberMe: z.coerce.boolean(),
});

type FormSchema = z.infer<typeof formSchema>;

export default function Page() {
	const [showPassword, setShowPassword] = useState(false);

	const form = useForm({
		resolver: zodResolver(formSchema),
	});

	const router = useRouter();

	async function handleSignIn(data: FormSchema) {
		await authClient.signIn.email({
			email: data.email,
			password: data.password,
			rememberMe: data.rememberMe,
			fetchOptions: {
				onSuccess: () => router.push("/dashboard"),
				onError: (ctx) => alert(ctx.error.message),
			},
		});
	}

	return (
		<Card>
			<CardContent className="flex gap-8 w-fit lg:w-full">
				<div className="flex-1 rounded-2xl relative overflow-hidden hidden lg:block">
					<Image
						alt=""
						className="object-cover"
						src={SignInTemplateAsset}
						fill
						priority
						sizes="64rem"
					/>
				</div>

				{/* Sign In Form */}
				<Form {...form}>
					<form
						className="mx-auto flex flex-col gap-6 w-[480px]"
						onSubmit={form.handleSubmit(handleSignIn)}
					>
						<h3 className="text-2xl">Sign In</h3>
						<p className="text-sm">
							Enter your email below to login to your account
						</p>

						{/* Email Field */}
						<InputUiComponent.Root>
							<InputUiComponent.Label
								htmlFor="custom-input-email"
								variants={{ error: !!form.formState.errors.email }}
							>
								Email
							</InputUiComponent.Label>
							<InputUiComponent.Core>
								<InputUiComponent.PrefixIcon>
									<MailIcon size={18} />
								</InputUiComponent.PrefixIcon>

								<InputUiComponent.Input
									id="custom-input-email"
									type="email"
									placeholder="your@email.com"
									variants={{ withPrefixIcon: true }}
									{...form.register("email")}
								/>
							</InputUiComponent.Core>

							<InputUiComponent.ErrorMessage>
								{form.formState.errors.email?.message}
							</InputUiComponent.ErrorMessage>
						</InputUiComponent.Root>

						{/* Password Field */}
						<InputUiComponent.Root>
							<InputUiComponent.Label
								htmlFor="custom-input-password"
								variants={{ error: !!form.formState.errors.password }}
							>
								Password
							</InputUiComponent.Label>
							<InputUiComponent.Core>
								<InputUiComponent.PrefixIcon>
									<LockIcon size={18} />
								</InputUiComponent.PrefixIcon>

								<InputUiComponent.Input
									id="custom-input-password"
									type={showPassword ? "text" : "password"}
									placeholder="••••••••"
									variants={{
										withPrefixIcon: true,
										withActionIcon: true,
									}}
									{...form.register("password")}
								/>

								<InputUiComponent.ActionIcon
									onClick={() => setShowPassword((state) => !state)}
								>
									{showPassword ? (
										<EyeIcon size={18} />
									) : (
										<EyeOffIcon size={18} />
									)}
								</InputUiComponent.ActionIcon>
							</InputUiComponent.Core>

							<InputUiComponent.ErrorMessage>
								{form.formState.errors.password?.message}
							</InputUiComponent.ErrorMessage>
						</InputUiComponent.Root>

						{/* Remember Me & Forgot Password */}
						<FormField
							control={form.control}
							name="rememberMe"
							render={({ field }) => (
								<FormItem>
									<div className="flex items-center gap-2">
										<FormControl>
											<Checkbox
												checked={field.value}
												onCheckedChange={field.onChange}
											/>
										</FormControl>

										<FormLabel>Remember me</FormLabel>

										<Button className="ml-auto" type="button" variant="link">
											Forgot password?
										</Button>
									</div>

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
								"Sign In"
							)}
						</Button>

						{/* Divider */}
						<div className="relative">
							<div className="absolute inset-0 flex items-center">
								<div className="w-full border-t border-neutral-600" />
							</div>
							<div className="relative flex justify-center text-sm">
								<span className="px-2 bg-neutral-800 text-neutral-400">
									Or continue with
								</span>
							</div>
						</div>

						{/* Social Login */}
						<SocialLoginComponent />

						<div className="flex justify-center w-full border-t border-neutral-600 py-4">
							<p className="text-center text-xs text-neutral-500">
								Powered by{" "}
								<Link
									href="https://better-auth.com"
									className="underline"
									target="_blank"
								>
									<span className="text-orange-500">better-auth</span>.
								</Link>
							</p>
						</div>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}
