import { db } from "@/db";
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

export const createNewProject = async ({
	name,
	userId,
}: Pick<InsertProjectData, "name" | "userId">): Promise<ProjectData> => {
	const inserted = await db
		.insert(project)
		.values({ name, userId })
		.returning();

	return inserted[0];
};
