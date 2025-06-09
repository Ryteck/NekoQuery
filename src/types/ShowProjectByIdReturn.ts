import type { ProjectData } from "@/db/schema/project";

export default interface ShowProjectByIdReturn extends ProjectData {
	members: Array<{
		userId: string;
		userName: string;
		participantId: string;
		participantRole: string;
	}>;
}
