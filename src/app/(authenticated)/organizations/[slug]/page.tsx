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
import UserAvatarComponent from "@/components/user-avatar";
import { auth } from "@/lib/auth";
import { EllipsisIcon, ExternalLinkIcon } from "lucide-react";
import { headers } from "next/headers";

interface Params {
	slug: string;
}

interface Props {
	params: Promise<Params>;
}

export default async function Page(props: Props) {
	const params = await props.params;

	const organization = await auth.api.getFullOrganization({
		headers: await headers(),
		query: { organizationSlug: params.slug },
	});

	return (
		<Card>
			<CardHeader>
				<CardTitle>Organization</CardTitle>
				<CardDescription>{organization?.name}</CardDescription>
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
						{organization?.members.map((arg) => (
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
