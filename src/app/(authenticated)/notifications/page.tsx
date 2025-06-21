"use client";

import { useNavigationStore } from "@/stores/navigation";
import { useEffect } from "react";

export default function Page() {
	const navigationStore = useNavigationStore();

	useEffect(() => {
		navigationStore.setCurrentPage("Notifications");
	}, []);

	return <div className="flex flex-col gap-8">Notifications</div>;
}
