import type { ComponentProps } from "react";
import { type VariantProps, tv } from "tailwind-variants";

// Root

const RootInputStyles = tv({
	base: "flex flex-col gap-1",
});

export type RootInputVariants = VariantProps<typeof RootInputStyles>;

export interface RootInputComponentProps extends ComponentProps<"div"> {
	variants?: RootInputVariants;
}

export function Root({
	className,
	variants,
	...props
}: RootInputComponentProps) {
	return (
		<div className={RootInputStyles({ className, ...variants })} {...props} />
	);
}

// Label

const LabelInputStyles = tv({
	base: "block text-sm font-medium text-neutral-300",
	variants: {
		error: { true: "text-red-500" },
	},
});

export type LabelInputVariants = VariantProps<typeof LabelInputStyles>;

export interface LabelInputComponentProps extends ComponentProps<"label"> {
	variants?: LabelInputVariants;
}

export function Label({
	className,
	variants,
	...props
}: LabelInputComponentProps) {
	return (
		// biome-ignore lint/a11y/noLabelWithoutControl: <explanation>
		<label
			className={LabelInputStyles({ className, ...variants })}
			{...props}
		/>
	);
}

// Core

const CoreInputStyles = tv({
	base: "relative",
});

export type CoreInputVariants = VariantProps<typeof CoreInputStyles>;

export interface CoreInputComponentProps extends ComponentProps<"div"> {
	variants?: CoreInputVariants;
}

export function Core({
	className,
	variants,
	...props
}: CoreInputComponentProps) {
	return (
		<div className={CoreInputStyles({ className, ...variants })} {...props} />
	);
}

// PrefixIcon

const PrefixIconInputStyles = tv({
	base: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-500",
});

export type PrefixIconInputVariants = VariantProps<
	typeof PrefixIconInputStyles
>;

export interface PrefixIconInputComponentProps extends ComponentProps<"span"> {
	variants?: PrefixIconInputVariants;
}

export function PrefixIcon({
	className,
	variants,
	...props
}: PrefixIconInputComponentProps) {
	return (
		<span
			className={PrefixIconInputStyles({ className, ...variants })}
			{...props}
		/>
	);
}

// Input

const InputInputStyles = tv({
	base: [
		"block w-full pl-3 pr-3 py-2 bg-neutral-700 text-neutral-200 placeholder-neutral-500",
		"border rounded-md border-neutral-600 focus:outline-none focus:ring-2 focus:ring-rose-600 focus:border-transparent",
		"disabled:text-neutral-400",
	],
	variants: {
		withPrefixIcon: { true: "pl-10" },
		withActionIcon: { true: "pr-10" },
	},
});

export type InputInputVariants = VariantProps<typeof InputInputStyles>;

export interface InputInputComponentProps extends ComponentProps<"input"> {
	variants?: InputInputVariants;
}

export function Input({
	className,
	variants,
	type,
	...props
}: InputInputComponentProps) {
	return (
		<input
			type={type ?? "text"}
			className={InputInputStyles({ className, ...variants })}
			{...props}
		/>
	);
}

// ActionIcon

const ActionIconInputStyles = tv({
	base: "cursor-pointer absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-400 hover:text-neutral-300 focus:outline-none",
});

export type ActionIconInputVariants = VariantProps<
	typeof ActionIconInputStyles
>;

export interface ActionIconInputComponentProps
	extends ComponentProps<"button"> {
	variants?: ActionIconInputVariants;
}

export function ActionIcon({
	type,
	className,
	variants,
	...props
}: ActionIconInputComponentProps) {
	return (
		<button
			type={type ?? "button"}
			className={ActionIconInputStyles({ className, ...variants })}
			{...props}
		/>
	);
}

// ErrorMessage

const ErrorMessageInputStyles = tv({
	base: "font-medium text-sm text-red-500",
});

export type ErrorMessageInputVariants = VariantProps<
	typeof ErrorMessageInputStyles
>;

export interface ErrorMessageInputComponentProps extends ComponentProps<"p"> {
	variants?: ErrorMessageInputVariants;
}

export function ErrorMessage({
	className,
	variants,
	...props
}: ErrorMessageInputComponentProps) {
	return (
		<p
			className={ErrorMessageInputStyles({ className, ...variants })}
			{...props}
		/>
	);
}
