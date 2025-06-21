"use client";

import { EmailAccountFormComponent } from "@/components/forms/account/email";
import { PasswordAccountFormComponent } from "@/components/forms/account/password";
import { ProfileAccountFormComponent } from "@/components/forms/account/profile";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { useNavigationStore } from "@/stores/navigation";
import { useEffect } from "react";

export default function Page() {
	const navigationStore = useNavigationStore();

	useEffect(() => {
		navigationStore.setCurrentPage("Account");
	}, []);

	return (
		<Card className="w-full">
			<CardHeader>
				<CardTitle>Edit Profile</CardTitle>
				<CardDescription>
					Update your personal information below.
				</CardDescription>
			</CardHeader>

			<CardContent>
				<div className="flex flex-col lg:flex-row gap-8">
					<div className="w-full flex flex-col gap-8">
						<ProfileAccountFormComponent />
						<EmailAccountFormComponent />
					</div>

					<div className="w-full flex flex-col gap-8">
						<PasswordAccountFormComponent />
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
