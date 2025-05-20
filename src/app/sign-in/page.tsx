"use client";

import SignInTemplateAsset from "@/assets/sign-in-template.jpg";
import SocialLoginComponent from "@/components/social-login";
import ButtonComponent from "@/components/ui/button";
import * as InputComponent from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeIcon, EyeOffIcon, LockIcon, MailIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
	email: z.string().email(),
	password: z.string().min(8),
	rememberMe: z.boolean(),
});

type FormSchema = z.infer<typeof formSchema>;

export default function Page() {
	const [showPassword, setShowPassword] = useState(false);

	const form = useForm({
		resolver: zodResolver(formSchema),
	});

	function handleSignIn(data: FormSchema) {
		console.log("SignIn data", data);
	}

	return (
		<div className="flex gap-8 bg-neutral-800 rounded-2xl p-8">
			<div className="flex-1 rounded-2xl relative overflow-hidden">
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
			<form
				className="mx-auto flex flex-col gap-6 w-[480px]"
				onSubmit={form.handleSubmit(handleSignIn)}
			>
				<h3 className="text-2xl">Sign In</h3>
				<p className="text-sm">
					Enter your email below to login to your account
				</p>

				{/* Email Field */}
				<InputComponent.Root>
					<InputComponent.Label
						htmlFor="custom-input-email"
						variants={{ error: !!form.formState.errors.email }}
					>
						Email
					</InputComponent.Label>
					<InputComponent.Core>
						<InputComponent.PrefixIcon>
							<MailIcon size={18} />
						</InputComponent.PrefixIcon>

						<InputComponent.Input
							id="custom-input-email"
							type="email"
							placeholder="your@email.com"
							variants={{ withPrefixIcon: true }}
							{...form.register("email")}
						/>
					</InputComponent.Core>

					<InputComponent.ErrorMessage>
						{form.formState.errors.email?.message}
					</InputComponent.ErrorMessage>
				</InputComponent.Root>

				{/* Password Field */}
				<InputComponent.Root>
					<InputComponent.Label
						htmlFor="custom-input-password"
						variants={{ error: !!form.formState.errors.password }}
					>
						Password
					</InputComponent.Label>
					<InputComponent.Core>
						<InputComponent.PrefixIcon>
							<LockIcon size={18} />
						</InputComponent.PrefixIcon>

						<InputComponent.Input
							id="custom-input-password"
							type={showPassword ? "text" : "password"}
							placeholder="••••••••"
							variants={{
								withPrefixIcon: true,
								withActionIcon: true,
							}}
							{...form.register("password")}
						/>

						<InputComponent.ActionIcon
							onClick={() => setShowPassword((state) => !state)}
						>
							{showPassword ? <EyeIcon size={18} /> : <EyeOffIcon size={18} />}
						</InputComponent.ActionIcon>
					</InputComponent.Core>

					<InputComponent.ErrorMessage>
						{form.formState.errors.password?.message}
					</InputComponent.ErrorMessage>
				</InputComponent.Root>

				{/* Remember Me & Forgot Password */}
				<div className="flex items-center justify-between">
					<div className="flex items-center">
						<input
							id="custom-input-remember-me"
							type="checkbox"
							className="h-4 w-4 text-rose-600 focus:ring-rose-500 border-neutral-600 rounded bg-neutral-700 accent-rose-600"
							{...form.register("rememberMe")}
						/>
						<label
							htmlFor="custom-input-remember-me"
							className="ml-2 block text-sm text-neutral-300"
						>
							Remember me
						</label>
					</div>

					<span className="cursor-pointer text-sm font-medium text-rose-600 hover:text-rose-500">
						Forgot password?
					</span>
				</div>

				{/* Submit Button */}
				<ButtonComponent type="submit">Sign In</ButtonComponent>

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
		</div>
	);
}
