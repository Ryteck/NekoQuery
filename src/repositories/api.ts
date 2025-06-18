import { db } from "@/db";
import { type ApiData, type InsertApiData, api } from "@/db/schema/api";
import { and, eq } from "drizzle-orm";

export async function listApisByUserId(userId: string): Promise<ApiData[]> {
	return db.select().from(api).where(eq(api.userId, userId));
}

export async function createNewApi({
	name,
	baseUrl,
	userId,
	organizationId,
}: Pick<
	InsertApiData,
	"name" | "baseUrl" | "userId" | "organizationId"
>): Promise<ApiData> {
	const inserteds = await db
		.insert(api)
		.values({ name, baseUrl, userId, organizationId })
		.returning();

	return inserteds[0];
}

export async function deleteApiById({
	id,
	userId,
}: Pick<ApiData, "id" | "userId">): Promise<ApiData> {
	const deleted = await db
		.delete(api)
		.where(and(eq(api.id, id), eq(api.userId, userId)))
		.returning();

	if (deleted.length === 0) throw new Error("Api not found");

	return deleted[0];
}
