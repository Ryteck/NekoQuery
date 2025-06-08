import type { InsertProjectData } from "@/db/schema/project";

export default interface ShowProjectByIdReturn extends InsertProjectData {
	members: Array<{
		userId: string;
		userName: string;
		participantId: string;
		participantRole: string;
	}>;
}
