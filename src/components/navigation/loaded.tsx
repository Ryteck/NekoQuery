"use client";

import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ChevronDownIcon } from "lucide-react";
import Link from "next/link";

export function NavigationLoadedComponent() {
	return (
		<div className="flex items-center gap-2 mb-4">
			<SidebarTrigger />
			<Separator
				orientation="vertical"
				className="mr-2 data-[orientation=vertical]:h-4"
			/>

			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem className="hidden md:block">
						<BreadcrumbLink asChild>
							<Link href="/">Home</Link>
						</BreadcrumbLink>
					</BreadcrumbItem>

					<BreadcrumbSeparator className="hidden md:block" />

					<BreadcrumbItem className="hidden md:block">
						<DropdownMenu>
							<DropdownMenuTrigger className="flex items-center gap-1 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-3.5">
								Components
								<ChevronDownIcon />
							</DropdownMenuTrigger>
							<DropdownMenuContent align="start">
								<DropdownMenuItem>Documentation</DropdownMenuItem>
								<DropdownMenuItem>Themes</DropdownMenuItem>
								<DropdownMenuItem>GitHub</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</BreadcrumbItem>

					<BreadcrumbSeparator className="hidden md:block" />

					<BreadcrumbItem>
						<BreadcrumbPage>Data Fetching</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>
		</div>
	);
}
