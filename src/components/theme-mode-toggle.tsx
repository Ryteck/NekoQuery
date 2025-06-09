"use client";

import { CheckIcon, ChevronDown, MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const themes = ["light", "dark", "system"];

export function ThemeModeToggleComponent() {
	const { theme, setTheme } = useTheme();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<DropdownMenuItem>
					<SunIcon className="h-[1.2rem] w-[1.2rem] scale-100 dark:scale-0" />
					<MoonIcon className="absolute h-[1.2rem] w-[1.2rem] scale-0 dark:scale-100" />
					Toggle theme
					<ChevronDown className="ml-auto" />
				</DropdownMenuItem>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				{themes.map((arg) => (
					<DropdownMenuItem
						key={arg}
						className="capitalize"
						onClick={() => setTheme(arg)}
					>
						{arg}
						{theme === arg && <CheckIcon className="ml-auto" />}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
