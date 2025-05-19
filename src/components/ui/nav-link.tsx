"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps } from "react";
import { type VariantProps, tv } from "tailwind-variants";

const NavLinkStyles = tv({
	base: "transition-colors hover:text-rose-600 hover:underline",
	variants: {
		disabled: {
			true: "pointer-events-none text-rose-700",
		},
	},
});

export type NavLinkVariants = VariantProps<typeof NavLinkStyles>;

export interface NavLinkComponentProps extends ComponentProps<typeof Link> {
	variants?: NavLinkVariants;
}

export default function NavLinkComponent({
	href,
	className,
	variants,
	...props
}: NavLinkComponentProps) {
	const pathname = usePathname();

	const disabled = href === pathname;

	return (
		<Link
			href={href}
			className={NavLinkStyles({ className, disabled, ...variants })}
			{...props}
		/>
	);
}
