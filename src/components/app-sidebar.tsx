"use client";

import {
	BadgeCheckIcon,
	BellIcon,
	ChartColumnIcon,
	ChevronsLeftRightEllipsisIcon,
	ChevronsUpDownIcon,
	CommandIcon,
	CreditCardIcon,
	FileTextIcon,
	FolderRootIcon,
	GalleryVerticalEndIcon,
	GamepadIcon,
	HomeIcon,
	InboxIcon,
	LayoutDashboardIcon,
	LogOutIcon,
	LogsIcon,
	PlusIcon,
	SettingsIcon,
	SparklesIcon,
	SquareTerminalIcon,
	TablePropertiesIcon,
	UsersIcon,
} from "lucide-react";

import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@/components/ui/sidebar";
import { authClient } from "@/lib/auth-client";
import { useProjectStore } from "@/stores/project";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ThemeModeToggleComponent } from "./theme-mode-toggle";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import UserAvatarComponent from "./user-avatar";

// Menu items.
const menuItems = [
	{
		title: "Home",
		url: "/",
		icon: HomeIcon,
	},
	{
		title: "About",
		url: "/about",
		icon: InboxIcon,
	},
	{
		title: "Dashboard",
		url: "/dashboard",
		icon: LayoutDashboardIcon,
	},
];

// Project Menu Items
const projectMenuItems = [
	{
		title: "Project",
		url: "",
		icon: FolderRootIcon,
	},
	{
		title: "Schemas",
		url: "/schemas",
		icon: TablePropertiesIcon,
	},
	{
		title: "Playground",
		url: "/playground",
		icon: GamepadIcon,
	},
	{
		title: "Stats",
		url: "/stats",
		icon: ChartColumnIcon,
	},
	{
		title: "Console",
		url: "/console",
		icon: SquareTerminalIcon,
	},
	{
		title: "Queries",
		url: "/queries",
		icon: ChevronsLeftRightEllipsisIcon,
	},
	{
		title: "Members",
		url: "/members",
		icon: UsersIcon,
	},
	{
		title: "Reports",
		url: "/reports",
		icon: FileTextIcon,
	},
	{
		title: "Settings",
		url: "/settings",
		icon: SettingsIcon,
	},
	{
		title: "Logs",
		url: "/project-logs",
		icon: LogsIcon,
	},
];

export function AppSidebarComponent() {
	const projectStore = useProjectStore();
	const selectedProject = projectStore.project;

	const router = useRouter();
	const pathName = usePathname();

	const { isMobile } = useSidebar();

	const session = authClient.useSession();

	const organizations = authClient.useListOrganizations();
	const activeOrganization = authClient.useActiveOrganization();

	if (session.isPending || !session.data) return null;

	return (
		<Sidebar variant="floating" collapsible="icon">
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<SidebarMenuButton
									size="lg"
									className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
								>
									<div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
										{organizations.isPending || !activeOrganization.data ? (
											<GalleryVerticalEndIcon className="size-4" />
										) : (
											<CommandIcon className="size-4" />
										)}
									</div>
									<div className="grid flex-1 text-left text-sm leading-tight">
										<span className="truncate font-medium">
											{organizations.isPending || !activeOrganization.data
												? "Personal environment"
												: activeOrganization.data?.name}
										</span>

										<span className="truncate text-xs">
											{organizations.isPending || !activeOrganization.data
												? "Startup"
												: "Enterprise"}
										</span>
									</div>
									<ChevronsUpDownIcon className="ml-auto" />
								</SidebarMenuButton>
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
											<DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
										</DropdownMenuItem>
									))}
								<DropdownMenuSeparator />
								<DropdownMenuItem className="gap-2 p-2" asChild>
									<Link href="/organizations">
										<div className="flex size-6 items-center justify-center rounded-md border bg-transparent">
											<PlusIcon className="size-4" />
										</div>
										<div className="text-muted-foreground font-medium">
											Add organization
										</div>
									</Link>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>

			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Application</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{menuItems.map((item) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton
										disabled={pathName === item.url}
										onClick={() => {
											router.push(item.url);
										}}
									>
										<item.icon />
										<span>{item.title}</span>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>

				{selectedProject && (
					<SidebarGroup>
						<SidebarGroupLabel>Project</SidebarGroupLabel>
						<SidebarGroupContent>
							<SidebarMenu>
								{projectMenuItems.map((item) => {
									const baseUrl = `/projects/${selectedProject.id}`;
									const destinyPath = `${baseUrl}${item.url}`;

									return (
										<SidebarMenuItem key={item.title}>
											<SidebarMenuButton
												disabled={pathName === destinyPath}
												onClick={() => {
													router.push(destinyPath);
												}}
											>
												<item.icon />
												<span>{item.title}</span>
											</SidebarMenuButton>
										</SidebarMenuItem>
									);
								})}
							</SidebarMenu>
						</SidebarGroupContent>
					</SidebarGroup>
				)}
			</SidebarContent>

			<SidebarFooter>
				<SidebarMenu>
					<SidebarMenuItem>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<SidebarMenuButton
									size="lg"
									className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
								>
									<UserAvatarComponent />

									<div className="grid flex-1 text-left text-sm leading-tight">
										<span className="truncate font-medium">
											{session.data.user.name}
										</span>
										<span className="truncate text-xs">
											{session.data.user.email}
										</span>
									</div>
									<ChevronsUpDownIcon className="ml-auto size-4" />
								</SidebarMenuButton>
							</DropdownMenuTrigger>
							<DropdownMenuContent
								className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
								side={isMobile ? "bottom" : "right"}
								align="end"
								sideOffset={4}
							>
								<DropdownMenuLabel className="p-0 font-normal">
									<div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
										<UserAvatarComponent />

										<div className="grid flex-1 text-left text-sm leading-tight">
											<span className="truncate font-medium">
												{session.data.user.name}
											</span>
											<span className="truncate text-xs">
												{session.data.user.email}
											</span>
										</div>
									</div>
								</DropdownMenuLabel>
								<DropdownMenuSeparator />
								<DropdownMenuGroup>
									<DropdownMenuItem>
										<SparklesIcon />
										Upgrade to Pro
									</DropdownMenuItem>
								</DropdownMenuGroup>
								<DropdownMenuSeparator />
								<DropdownMenuGroup>
									<DropdownMenuItem>
										<BadgeCheckIcon />
										Account
									</DropdownMenuItem>

									<ThemeModeToggleComponent />

									<DropdownMenuItem>
										<CreditCardIcon />
										Billing
									</DropdownMenuItem>
									<DropdownMenuItem>
										<BellIcon />
										Notifications
									</DropdownMenuItem>
								</DropdownMenuGroup>
								<DropdownMenuSeparator />
								<DropdownMenuItem
									variant="destructive"
									onClick={async () => {
										await authClient.signOut({
											fetchOptions: {
												onSuccess: () => router.push("/"),
											},
										});
									}}
								>
									<LogOutIcon />
									Log out
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>
		</Sidebar>
	);
}
