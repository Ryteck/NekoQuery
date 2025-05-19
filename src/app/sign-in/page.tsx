"use client";

import ButtonComponent from "@/components/ui/button";
import * as InputComponent from "@/components/ui/input";
import { EyeIcon, EyeOffIcon, LockIcon, MailIcon } from "lucide-react";
import { useState } from "react";

export default function Page() {
	const [showPassword, setShowPassword] = useState(false);

	return (
		/* Sign In Form */
		<form className="mx-auto flex flex-col gap-6 bg-neutral-800 max-w-[560px] p-8 rounded-2xl">
			{/* Email Field */}
			<InputComponent.Root>
				<InputComponent.Label>Email</InputComponent.Label>
				<InputComponent.Core>
					<InputComponent.PrefixIcon>
						<MailIcon size={18} />
					</InputComponent.PrefixIcon>

					<InputComponent.Input
						type={showPassword ? "text" : "password"}
						placeholder="your@email.com"
						variants={{ withPrefixIcon: true }}
					/>
				</InputComponent.Core>
			</InputComponent.Root>

			{/* Password Field */}
			<InputComponent.Root>
				<InputComponent.Label>Password</InputComponent.Label>
				<InputComponent.Core>
					<InputComponent.PrefixIcon>
						<LockIcon size={18} />
					</InputComponent.PrefixIcon>

					<InputComponent.Input
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
		</form>
	);
}
