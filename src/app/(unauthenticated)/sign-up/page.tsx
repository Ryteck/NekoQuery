"use client";

import SignUpTemplateAsset from "@/assets/sign-up-template.jpg";
import * as InputUiComponent from "@/components/custom-ui/input";
import SocialLoginComponent from "@/components/social-login";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
		<div className="flex gap-8 bg-neutral-800 rounded-2xl p-8 mx-auto w-fit lg:w-full">
			{/* Sign Up Form */}
			<form
				className="mx-auto flex flex-col gap-6 min-w-[480px]"
				onSubmit={form.handleSubmit(handleSignUp)}
			>
				<h3 className="text-2xl">Sign Up</h3>
				<p className="text-sm">
					Complete the fields below to set up your new account
				</p>

				{/* Full Name Field */}
				<InputUiComponent.Root>
					<InputUiComponent.Label
						htmlFor="input-name"
						variants={{ error: !!form.formState.errors.name }}
					>
						Full Name
					</InputUiComponent.Label>
					<InputUiComponent.Core>
						<InputUiComponent.PrefixIcon>
							<User2Icon size={18} />
						</InputUiComponent.PrefixIcon>

						<InputUiComponent.Input
							id="input-name"
							placeholder="John Doe"
							variants={{ withPrefixIcon: true }}
							{...form.register("name")}
						/>
					</InputUiComponent.Core>

					<InputUiComponent.ErrorMessage>
						{form.formState.errors.name?.message}
					</InputUiComponent.ErrorMessage>
				</InputUiComponent.Root>

				{/* Email Field */}
				<InputUiComponent.Root>
					<InputUiComponent.Label
						htmlFor="input-email"
						variants={{ error: !!form.formState.errors.email }}
					>
						Email
					</InputUiComponent.Label>
					<InputUiComponent.Core>
						<InputUiComponent.PrefixIcon>
							<MailIcon size={18} />
						</InputUiComponent.PrefixIcon>

						<InputUiComponent.Input
							id="input-email"
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
						htmlFor="input-password"
						variants={{ error: !!form.formState.errors.password }}
					>
						Password
					</InputUiComponent.Label>
					<InputUiComponent.Core>
						<InputUiComponent.PrefixIcon>
							<LockIcon size={18} />
						</InputUiComponent.PrefixIcon>

						<InputUiComponent.Input
							id="input-password"
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
							{showPassword ? <EyeIcon size={18} /> : <EyeOffIcon size={18} />}
						</InputUiComponent.ActionIcon>
					</InputUiComponent.Core>

					<InputUiComponent.ErrorMessage>
						{form.formState.errors.password?.message}
					</InputUiComponent.ErrorMessage>
				</InputUiComponent.Root>

				{/*  Confirm Password Field */}
				<InputUiComponent.Root>
					<InputUiComponent.Label
						htmlFor="input-confirm-password"
						variants={{ error: !!form.formState.errors.confirmPassword }}
					>
						Confirm Password
					</InputUiComponent.Label>
					<InputUiComponent.Core>
						<InputUiComponent.PrefixIcon>
							<LockIcon size={18} />
						</InputUiComponent.PrefixIcon>

						<InputUiComponent.Input
							id="input-confirm-password"
							type={showPassword ? "text" : "password"}
							placeholder="••••••••"
							variants={{
								withPrefixIcon: true,
								withActionIcon: true,
							}}
							{...form.register("confirmPassword")}
						/>

						<InputUiComponent.ActionIcon
							onClick={() => setShowPassword((state) => !state)}
						>
							{showPassword ? <EyeIcon size={18} /> : <EyeOffIcon size={18} />}
						</InputUiComponent.ActionIcon>
					</InputUiComponent.Core>

					<InputUiComponent.ErrorMessage>
						{form.formState.errors.confirmPassword?.message}
					</InputUiComponent.ErrorMessage>
				</InputUiComponent.Root>

				{/* Terms */}
				<div className="flex flex-col gap-1l">
					<div className="flex items-center">
						<Checkbox
							id="custom-input-agree-terms"
							{...form.register("agreeToTerms")}
						/>

						<label
							htmlFor="custom-input-agree-terms"
							className="ml-2 block text-sm text-gray-300"
						>
							I agree to the{" "}
							<a
								href="/about"
								target="_blank"
								rel="noreferrer"
								className="text-rose-500 hover:text-rose-400"
							>
								Terms
							</a>{" "}
							and{" "}
							<a
								href="/about"
								target="_blank"
								rel="noreferrer"
								className="text-rose-500 hover:text-rose-400"
							>
								Privacy Policy
							</a>
						</label>
					</div>

					<InputUiComponent.ErrorMessage>
						{form.formState.errors.agreeToTerms?.message}
					</InputUiComponent.ErrorMessage>
				</div>

				{/* Submit Button */}
				<Button size="lg" type="submit" disabled={form.formState.isSubmitting}>
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
						<span className="px-2 bg-neutral-800 text-neutral-400">
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
		</div>
	);
}
