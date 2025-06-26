"use client";

import { EditorComponent } from "@/components/editor";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { useNavigationStore } from "@/stores/navigation";
import { EllipsisIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
	const navigationStore = useNavigationStore();
	const pathname = usePathname();

	useEffect(() => {
		navigationStore.setCurrentPage("Queries");
	}, [pathname]);

	return (
		<Card>
			<CardHeader>
				<CardTitle>Queries</CardTitle>
				<CardDescription>Write your queries here</CardDescription>
				<CardAction>
					<Button size="icon" variant="outline" type="button">
						<EllipsisIcon />
					</Button>
				</CardAction>
			</CardHeader>

			<CardContent>
				<EditorComponent />
			</CardContent>
		</Card>
	);
}
