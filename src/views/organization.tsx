"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { UserAvatarComponent } from "@/components/user-avatar";
import {
	type BetterAuthInvitation,
	type BetterAuthMember,
	type BetterAuthOrganization,
	authClient,
} from "@/lib/auth-client";
import { useNavigationStore } from "@/stores/navigation";
import { EllipsisIcon, ExternalLinkIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

interface FullOrganization extends BetterAuthOrganization {
	members: BetterAuthMember[];
	invitations: BetterAuthInvitation[];
}

interface Props {
	organization: FullOrganization;
}

export function OrganizationView({ organization }: Props) {
	const navigationStore = useNavigationStore();
	const pathname = usePathname();

	useEffect(() => {
		navigationStore.setEnableOrganizations(false);

		navigationStore.setSubPages([
			{ title: "Organizations List", url: "/organizations/list" },
		]);

		navigationStore.setCurrentPage(organization.name);

		authClient.organization.setActive({ organizationId: organization.id });
	}, [pathname]);

	return (
		<Card>
			<CardHeader>
				<CardTitle>Organization</CardTitle>
				<CardDescription>{organization.name}</CardDescription>
				<CardAction>
					<Button size="icon" variant="outline" type="button">
						<EllipsisIcon />
					</Button>
				</CardAction>
			</CardHeader>

			<CardContent>
				<Table>
					<TableCaption>List of active members.</TableCaption>
					<TableHeader>
						<TableRow>
							<TableHead className="text-center w-12">#</TableHead>
							<TableHead>Name</TableHead>
							<TableHead>E-Mail</TableHead>
							<TableHead className="text-center">Role</TableHead>
							<TableHead className="text-right">Access</TableHead>
						</TableRow>
					</TableHeader>

					<TableBody>
						{organization.members.map((arg) => (
							<TableRow key={arg.id}>
								<TableCell>
									<UserAvatarComponent />
								</TableCell>

								<TableCell>{arg.user.name}</TableCell>
								<TableCell>{arg.user.email}</TableCell>

								<TableCell className="text-center">
									<Badge>{arg.role}</Badge>
								</TableCell>

								<TableCell className="text-right">
									<Dialog>
										<DialogTrigger asChild>
											<Button size="icon" variant="outline">
												<ExternalLinkIcon />
											</Button>
										</DialogTrigger>

										<DialogContent>
											<DialogHeader>
												<DialogTitle>Member Details</DialogTitle>
												<DialogDescription>
													View and edit information about this organization
													member.
												</DialogDescription>
											</DialogHeader>

											<div className="flex items-center gap-4 px-4 py-2 w-fit border-2 rounded-2xl">
												<UserAvatarComponent />
												{arg.user.name}
												<Badge>{arg.role}</Badge>
											</div>

											<DialogFooter>
												<DialogClose asChild>
													<Button type="button" variant="secondary">
														Close
													</Button>
												</DialogClose>

												<Button type="submit">Confirm</Button>
											</DialogFooter>
										</DialogContent>
									</Dialog>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	);
}
