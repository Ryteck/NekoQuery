import type { ComponentProps } from "react";
import { type VariantProps, tv } from "tailwind-variants";

const ButtonStyles = tv({
	base: "transition-colors bg-rose-700 hover:bg-rose-600 rounded-lg px-4 py-2 cursor-pointer",
});

export type ButtonVariants = VariantProps<typeof ButtonStyles>;

export interface ButtonComponentProps extends ComponentProps<"button"> {
	variants?: ButtonVariants;
}

export default function ButtonComponent({
	type,
	className,
	variants,
	...props
}: ButtonComponentProps) {
	return (
		<button
			type={type ?? "button"}
			className={ButtonStyles({ className, ...variants })}
			{...props}
		/>
	);
}
