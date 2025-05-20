"use client";

import SignUpTemplateAsset from "@/assets/sign-up-template.jpg";
import SocialLoginComponent from "@/components/social-login";
import ButtonComponent from "@/components/ui/button";
import * as InputComponent from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	EyeIcon,
	EyeOffIcon,
	LockIcon,
	MailIcon,
	User2Icon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
	name: z.string().nonempty(),
	email: z.string().email(),
	password: z.string().min(8),
	confirmPassword: z.string().min(8),
	agreeToTerms: z.literal(true),
});

type FormSchema = z.infer<typeof formSchema>;

export default function Page() {
	const [showPassword, setShowPassword] = useState(false);

	const form = useForm({
		resolver: zodResolver(formSchema),
	});

	function handleSignUp(data: FormSchema) {
		console.log("SignUp data", data);
	}

	return (
		<div className="flex gap-8 bg-neutral-800 rounded-2xl p-8">
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
				<InputComponent.Root>
					<InputComponent.Label
						htmlFor="input-name"
						variants={{ error: !!form.formState.errors.name }}
					>
						Full Name
					</InputComponent.Label>
					<InputComponent.Core>
						<InputComponent.PrefixIcon>
							<User2Icon size={18} />
						</InputComponent.PrefixIcon>

						<InputComponent.Input
							id="input-name"
							type="text"
							placeholder="John Doe"
							variants={{ withPrefixIcon: true }}
							{...form.register("name")}
						/>
					</InputComponent.Core>

					<InputComponent.ErrorMessage>
						{form.formState.errors.name?.message}
					</InputComponent.ErrorMessage>
				</InputComponent.Root>

				{/* Email Field */}
				<InputComponent.Root>
					<InputComponent.Label
						htmlFor="input-email"
						variants={{ error: !!form.formState.errors.email }}
					>
						Email
					</InputComponent.Label>
					<InputComponent.Core>
						<InputComponent.PrefixIcon>
							<MailIcon size={18} />
						</InputComponent.PrefixIcon>

						<InputComponent.Input
							id="input-email"
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
						htmlFor="input-password"
						variants={{ error: !!form.formState.errors.password }}
					>
						Password
					</InputComponent.Label>
					<InputComponent.Core>
						<InputComponent.PrefixIcon>
							<LockIcon size={18} />
						</InputComponent.PrefixIcon>

						<InputComponent.Input
							id="input-password"
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

				{/*  Confirm Password Field */}
				<InputComponent.Root>
					<InputComponent.Label
						htmlFor="input-confirm-password"
						variants={{ error: !!form.formState.errors.confirmPassword }}
					>
						Confirm Password
					</InputComponent.Label>
					<InputComponent.Core>
						<InputComponent.PrefixIcon>
							<LockIcon size={18} />
						</InputComponent.PrefixIcon>

						<InputComponent.Input
							id="input-confirm-password"
							type={showPassword ? "text" : "password"}
							placeholder="••••••••"
							variants={{
								withPrefixIcon: true,
								withActionIcon: true,
							}}
							{...form.register("confirmPassword")}
						/>

						<InputComponent.ActionIcon
							onClick={() => setShowPassword((state) => !state)}
						>
							{showPassword ? <EyeIcon size={18} /> : <EyeOffIcon size={18} />}
						</InputComponent.ActionIcon>
					</InputComponent.Core>

					<InputComponent.ErrorMessage>
						{form.formState.errors.confirmPassword?.message}
					</InputComponent.ErrorMessage>
				</InputComponent.Root>

				{/* Terms */}
				<div className="flex items-center">
					<input
						id="custom-input-agree-terms"
						type="checkbox"
						className="h-4 w-4 text-rose-600 focus:ring-rose-500 border-neutral-600 rounded bg-neutral-700 accent-rose-600"
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

				{/* Submit Button */}
				<ButtonComponent type="submit">Create account</ButtonComponent>

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

			<div className="flex-1 rounded-2xl relative overflow-hidden">
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
