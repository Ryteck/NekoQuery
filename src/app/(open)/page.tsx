"use client";

import { useNavigationStore } from "@/stores/navigation";
import { useEffect } from "react";

export default function Page() {
	const navigationStore = useNavigationStore();

	useEffect(() => {
		navigationStore.setCurrentPage("Home");
	}, []);

	return "Hello, Neko Query!";
}
