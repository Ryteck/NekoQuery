import Link from "next/link";
import type { ComponentProps, PropsWithChildren } from "react";
import { type VariantProps, tv } from "tailwind-variants";

const NavLinkStyles = tv({
	base: "transition-colors hover:text-rose-600",
});

export type NavLinkVariants = VariantProps<typeof NavLinkStyles>;

export interface NavLinkComponentProps extends ComponentProps<typeof Link> {
	variants?: NavLinkVariants;
}

export function NavLinkComponent({
	className,
	variants,
	...props
}: PropsWithChildren<NavLinkComponentProps>) {
	return (
		<Link className={NavLinkStyles({ className, ...variants })} {...props} />
	);
}
