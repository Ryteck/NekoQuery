import type { ComponentProps } from "react";
import { tv } from "tailwind-variants";

type ContainerProps = ComponentProps<"main">;

const containerClassname = tv({ base: "container mx-auto" });

export function Container({ className, ...props }: ContainerProps) {
	return <main className={containerClassname({ className })} {...props} />;
}
