import { db } from "@/db";
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

export const showProjectById = async (id: string): Promise<ProjectData> => {
	const selecteds = await db.select().from(project).where(eq(project.id, id));
	const selected = selecteds[0];
	return selected;
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
