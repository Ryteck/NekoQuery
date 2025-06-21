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
	DropdownMenuLabel,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { authClient } from "@/lib/auth-client";
import { useNavigationStore } from "@/stores/navigation";
import {
	ChevronDownIcon,
	CommandIcon,
	GalleryVerticalEndIcon,
} from "lucide-react";
import Link from "next/link";

export function NavigationLoadedComponent() {
	const { isMobile } = useSidebar();

	const navigationStore = useNavigationStore();

	const organizations = authClient.useListOrganizations();
	const activeOrganization = authClient.useActiveOrganization();

	return (
		<div className="flex items-center gap-2 mb-4">
			<SidebarTrigger />
			<Separator
				orientation="vertical"
				className="mr-2 data-[orientation=vertical]:h-4"
			/>

			<Breadcrumb>
				<BreadcrumbList>
					{navigationStore.basePage && (
						<>
							<BreadcrumbItem className="hidden md:block">
								<BreadcrumbLink asChild>
									<Link href={navigationStore.basePage.url}>
										{navigationStore.basePage.title}
									</Link>
								</BreadcrumbLink>
							</BreadcrumbItem>

							<BreadcrumbSeparator className="hidden md:block" />
						</>
					)}

					{navigationStore.enableOrganizations && (
						<>
							<BreadcrumbItem className="hidden md:block">
								<DropdownMenu>
									<DropdownMenuTrigger className="flex items-center gap-1 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-3.5">
										Organizations
										<ChevronDownIcon />
									</DropdownMenuTrigger>

									<DropdownMenuContent
										className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
										align="start"
										side={isMobile ? "bottom" : "right"}
										sideOffset={4}
									>
										<DropdownMenuLabel className="text-muted-foreground text-xs">
											Organizations
										</DropdownMenuLabel>

										{activeOrganization.data && (
											<DropdownMenuItem
												onClick={async () => {
													await authClient.organization.setActive({
														organizationId: null,
													});
												}}
												className="gap-2 p-2"
											>
												<div className="flex size-6 items-center justify-center rounded-md border">
													<GalleryVerticalEndIcon className="size-3.5 shrink-0" />
												</div>
												Personal environment
												<DropdownMenuShortcut>⌘0</DropdownMenuShortcut>
											</DropdownMenuItem>
										)}

										{organizations.data
											?.filter((arg) => arg.id !== activeOrganization.data?.id)
											.map((organization, index) => (
												<DropdownMenuItem
													key={organization.name}
													onClick={async () => {
														await authClient.organization.setActive({
															organizationId: organization.id,
														});
													}}
													className="gap-2 p-2"
												>
													<div className="flex size-6 items-center justify-center rounded-md border">
														<CommandIcon className="size-3.5 shrink-0" />
													</div>
													{organization.name}
													<DropdownMenuShortcut>
														⌘{index + 1}
													</DropdownMenuShortcut>
												</DropdownMenuItem>
											))}
									</DropdownMenuContent>
								</DropdownMenu>
							</BreadcrumbItem>

							<BreadcrumbSeparator className="hidden md:block" />
						</>
					)}

					{navigationStore.currentPage && (
						<BreadcrumbItem>
							<BreadcrumbPage>{navigationStore.currentPage}</BreadcrumbPage>
						</BreadcrumbItem>
					)}
				</BreadcrumbList>
			</Breadcrumb>
		</div>
	);
}
