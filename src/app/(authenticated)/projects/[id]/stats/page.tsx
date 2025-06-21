"use client";

import { useNavigationStore } from "@/stores/navigation";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
	const navigationStore = useNavigationStore();
	const pathname = usePathname();

	useEffect(() => {
		navigationStore.setCurrentPage("Stats");
	}, [pathname]);

	return "Stats";
}
