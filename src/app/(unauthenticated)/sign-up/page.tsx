"use client";

import SignUpTemplateAsset from "@/assets/sign-up-template.jpg";
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
import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	EyeIcon,
	EyeOffIcon,
	LoaderIcon,
	LockIcon,
	MailIcon,
	User2Icon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z
	.object({
		name: z.string().nonempty({
			message: "Name is required.",
		}),
		email: z.string().email({
			message: "Please enter a valid email address.",
		}),
		password: z.string().min(8, {
			message: "Password must be at least 8 characters long.",
		}),
		confirmPassword: z.string().min(8, {
			message: "Please confirm your password (minimum 8 characters).",
		}),
		agreeToTerms: z.boolean().refine((arg) => arg, {
			message: "You must agree to the terms and conditions.",
		}),
	})
	.refine((arg) => arg.password === arg.confirmPassword, {
		message: "Passwords do not match.",
		path: ["confirmPassword"],
	});

type FormSchema = z.infer<typeof formSchema>;

export default function Page() {
	const [showPassword, setShowPassword] = useState(false);

	const form = useForm({
		defaultValues: {
			name: "",
			email: "",
			password: "",
			confirmPassword: "",
			agreeToTerms: false,
		},
		resolver: zodResolver(formSchema),
	});

	const router = useRouter();

	async function handleSignUp(data: FormSchema) {
		await authClient.signUp.email({
			name: data.name,
			email: data.email,
			password: data.password,
			fetchOptions: {
				onSuccess: () => router.push("/dashboard"),
				onError: (ctx) => alert(ctx.error.message),
			},
		});
	}

	return (
		<Card className="mx-a">
			<CardContent className="flex gap-8 w-fit lg:w-full">
				{/* Sign Up Form */}
				<Form {...form}>
					<form
						className="mx-auto flex flex-col gap-6 min-w-[480px]"
						onSubmit={form.handleSubmit(handleSignUp)}
					>
						<h3 className="text-2xl">Sign Up</h3>
						<p className="text-sm">
							Complete the fields below to set up your new account
						</p>

						{/* Full Name Field */}
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Full Name</FormLabel>

									<FormControl>
										<div className="relative">
											<User2Icon
												className="absolute top-2 left-2 text-input"
												size={20}
											/>

											<Input
												className="pl-9"
												placeholder="John Doe"
												{...field}
											/>
										</div>
									</FormControl>

									<FormDescription>Enter your full name.</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>

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

									<FormDescription>Enter your email address.</FormDescription>
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

									<FormDescription>
										Repeat the password to confirm.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>

						{/* Terms */}
						<FormField
							control={form.control}
							name="agreeToTerms"
							render={({ field }) => (
								<FormItem>
									<div className="flex items-center gap-2">
										<FormControl>
											<Checkbox
												checked={field.value}
												onCheckedChange={field.onChange}
											/>
										</FormControl>

										<FormLabel>
											I agree to the
											<Button variant="link" size="sm" className="p-0" asChild>
												<Link href="/about">Terms</Link>
											</Button>
											and
											<Button variant="link" size="sm" className="p-0" asChild>
												<Link href="/about">Privacy Policy</Link>
											</Button>
										</FormLabel>
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
								"Create account"
							)}
						</Button>

						{/* Divider */}
						<div className="relative">
							<div className="absolute inset-0 flex items-center">
								<div className="w-full border-t border-neutral-600" />
							</div>
							<div className="relative flex justify-center text-sm">
								<span className="px-2 bg-card text-neutral-400">
									Or sign up with
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

				<div className="flex-1 rounded-2xl relative overflow-hidden hidden lg:block">
					<Image
						alt=""
						className="object-cover"
						src={SignUpTemplateAsset}
						fill
						priority
						sizes="64rem"
					/>
				</div>
			</CardContent>
		</Card>
	);
}
