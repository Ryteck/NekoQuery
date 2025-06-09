"use client";

import SignInTemplateAsset from "@/assets/sign-in-template.jpg";
import SocialLoginComponent from "@/components/social-login";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
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
import { Separator } from "@/components/ui/separator";
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
	rememberMe: z.boolean(),
});

type FormSchema = z.infer<typeof formSchema>;

export default function Page() {
	const [showPassword, setShowPassword] = useState(false);

	const form = useForm({
		defaultValues: {
			email: "",
			password: "",
			rememberMe: false,
		},
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
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>

									<FormControl>
										<div className="relative">
											<MailIcon
												className="absolute top-2 left-2 text-input"
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

									<FormDescription>Your login email address.</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>

						{/* Password Field */}
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Password</FormLabel>

									<FormControl>
										<div className="relative">
											<LockIcon
												className="absolute top-2 left-2 text-input"
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

									<FormDescription>Your account password.</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>

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
							<Separator className="absolute mt-2.5 inset-0 flex items-center" />

							<div className="relative flex justify-center text-sm">
								<span className="px-2 bg-card text-neutral-400">
									Or continue with
								</span>
							</div>
						</div>

						{/* Social Login */}
						<SocialLoginComponent />

						<Separator />

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
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}
