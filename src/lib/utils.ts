import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]): string => twMerge(clsx(inputs));

export function getDiffInHoursText(d1: Date, d2 = new Date()): string {
	const diffInMs = d1.getTime() - d2.getTime();

	const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));

	return new Intl.RelativeTimeFormat("en", {
		style: "narrow",
	}).format(diffInHours, "hours");
}
