import AuthenticationProviderComponent from "@/components/providers/authentication";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import AuthenticationMode from "@/enums/AuthenticationState";
import type { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
	return (
		<AuthenticationProviderComponent mode={AuthenticationMode.Authenticated}>
			<div className="flex items-center gap-2 mb-4">
				<SidebarTrigger />
				<Separator
					orientation="vertical"
					className="mr-2 data-[orientation=vertical]:h-4"
				/>
				<Breadcrumb>
					<BreadcrumbList>
						<BreadcrumbItem className="hidden md:block">
							<BreadcrumbLink href="#">
								Building Your Application
							</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator className="hidden md:block" />
						<BreadcrumbItem>
							<BreadcrumbPage>Data Fetching</BreadcrumbPage>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>
			</div>

			{children}
		</AuthenticationProviderComponent>
	);
}
