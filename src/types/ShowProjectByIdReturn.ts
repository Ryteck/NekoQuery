import type { ProjectData } from "@/db/schema/project";

export default interface ShowProjectByIdReturn extends ProjectData {
	members: Array<{
		id: string;
		role: string;

		userId: string;
		userName: string;
		userEmail: string;
	}>;
}
