import type { ComponentProps, PropsWithChildren } from "react";
import { type VariantProps, tv } from "tailwind-variants";

const ButtonStyles = tv({
	base: "transition-colors bg-rose-600 hover:bg-rose-700 rounded-lg px-4 py-2 cursor-pointer",
});

export type ButtonVariants = VariantProps<typeof ButtonStyles>;

export interface ButtonComponentProps extends ComponentProps<"button"> {
	variants?: ButtonVariants;
}

export function ButtonComponent({
	type,
	className,
	variants,
	...props
}: PropsWithChildren<ButtonComponentProps>) {
	return (
		<button
			type={type ?? "button"}
			className={ButtonStyles({ className, ...variants })}
			{...props}
		/>
	);
}
