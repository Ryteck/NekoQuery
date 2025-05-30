import { db } from "@/db";
import { user } from "@/db/schema/auth";
import { participant } from "@/db/schema/participant";
import {
	type InsertProjectData,
	type ProjectData,
	project,
} from "@/db/schema/project";
import { eq } from "drizzle-orm";

export const listProjectsByUserId = async (
	userId: string,
): Promise<ProjectData[]> =>
	db.select().from(project).where(eq(project.userId, userId));

export interface ShowProjectByIdReturn extends ProjectData {
	members: Array<{
		userId: string;
		userName: string;
		participantId: string;
		participantRole: string;
	}>;
}

export const showProjectById = async (
	id: string,
): Promise<ShowProjectByIdReturn> => {
	const selectedProjects = await db
		.select()
		.from(project)
		.where(eq(project.id, id));

	const selectedProject = selectedProjects[0];

	if (!selectedProject) throw new Error("Project not found");

	const selectedMembers = await db
		.select({
			userId: user.id,
			userName: user.name,
			participantId: participant.id,
			participantRole: participant.role,
		})
		.from(participant)
		.innerJoin(user, eq(participant.userId, user.id))
		.where(eq(participant.projectId, selectedProject.id));

	return { ...selectedProject, members: selectedMembers };
};

export const createNewProject = async ({
	name,
	userId,
}: Pick<InsertProjectData, "name" | "userId">): Promise<ProjectData> => {
	return db.transaction(async (tx) => {
		const inserteds = await tx
			.insert(project)
			.values({ name, userId })
			.returning();

		const inserted = inserteds[0];

		await tx.insert(participant).values({
			userId,
			projectId: inserted.id,
			role: "owner",
		});

		return inserted;
	});
};
