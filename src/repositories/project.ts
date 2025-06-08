import { db } from "@/db";
import { user } from "@/db/schema/auth";
import { participant } from "@/db/schema/participant";
import {
	type InsertProjectData,
	type ProjectData,
	project,
} from "@/db/schema/project";
import type ShowProjectByIdReturn from "@/types/ShowProjectByIdReturn";
import { and, eq } from "drizzle-orm";

export async function listProjectsByUserId(
	userId: string,
): Promise<ProjectData[]> {
	return db.select().from(project).where(eq(project.userId, userId));
}

export async function showProjectById(
	id: string,
): Promise<ShowProjectByIdReturn> {
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
}

export async function createNewProject({
	name,
	userId,
}: Pick<InsertProjectData, "name" | "userId">): Promise<ProjectData> {
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
}

export async function deleteProjectById({
	id,
	userId,
}: Pick<ProjectData, "id" | "userId">): Promise<ProjectData> {
	const deleted = await db
		.delete(project)
		.where(and(eq(project.id, id), eq(project.userId, userId)))
		.returning();

	if (deleted.length === 0) throw new Error("Project not found");

	return deleted[0];
}
