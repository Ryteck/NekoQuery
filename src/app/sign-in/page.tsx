"use client";

import SignInTemplateAsset from "@/assets/sign-in-template.jpg";
import ButtonComponent from "@/components/ui/button";
import * as InputComponent from "@/components/ui/input";
import { EyeIcon, EyeOffIcon, LockIcon, MailIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Page() {
	const [showPassword, setShowPassword] = useState(false);

	return (
		<div className="flex gap-8 bg-neutral-800 rounded-2xl p-8">
			<div className="flex-1 rounded-2xl relative overflow-hidden">
				<Image alt="" className="object-cover" src={SignInTemplateAsset} fill />
			</div>

			{/* Sign In Form */}
			<form className="mx-auto flex flex-col gap-6 min-w-[480px]">
				<h3 className="text-2xl">Sign In</h3>
				<p className="text-sm">
					Enter your email below to login to your account
				</p>

				{/* Email Field */}
				<InputComponent.Root>
					<InputComponent.Label htmlFor="input-email">
						Email
					</InputComponent.Label>
					<InputComponent.Core>
						<InputComponent.PrefixIcon>
							<MailIcon size={18} />
						</InputComponent.PrefixIcon>

						<InputComponent.Input
							id="input-email"
							type={showPassword ? "text" : "password"}
							placeholder="your@email.com"
							variants={{ withPrefixIcon: true }}
						/>
					</InputComponent.Core>
				</InputComponent.Root>

				{/* Password Field */}
				<InputComponent.Root>
					<InputComponent.Label htmlFor="input-password">
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
						/>

						<InputComponent.ActionIcon
							onClick={() => setShowPassword((state) => !state)}
						>
							{showPassword ? <EyeIcon size={18} /> : <EyeOffIcon size={18} />}
						</InputComponent.ActionIcon>
					</InputComponent.Core>
				</InputComponent.Root>

				{/* Remember Me & Forgot Password */}
				<div className="flex items-center justify-between">
					<div className="flex items-center">
						<input
							id="remember-me"
							name="remember-me"
							type="checkbox"
							className="h-4 w-4 text-rose-600 focus:ring-rose-500 border-neutral-600 rounded bg-neutral-700 accent-rose-600"
						/>
						<label
							htmlFor="remember-me"
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
				<ButtonComponent>Sign In</ButtonComponent>

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
				<div className="grid grid-cols-3 gap-3">
					{["Google", "GitHub", "Facebook"].map((arg) => (
						<button
							key={arg}
							type="button"
							className="cursor-pointer w-full inline-flex justify-center py-2 px-4 border border-neutral-600 rounded-md shadow-sm bg-neutral-700 text-sm font-medium text-neutral-300 hover:bg-neutral-600"
						>
							{arg}
						</button>
					))}
				</div>

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
