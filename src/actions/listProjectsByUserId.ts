"use server";

import { getSessionFunction } from "@/functions/getSession";
import { actionClient } from "@/lib/safe-action";
import { listProjectsByUserId } from "@/repositories/project";
import { z } from "zod";

const outputActionSchema = z
	.object({
		id: z.string(),
		name: z.string(),
		userId: z.string(),
		createdAt: z.date(),
		updatedAt: z.date(),
	})
	.array();

export const listProjectsByUserIdAction = actionClient
	.outputSchema(outputActionSchema)
	.action(async () => {
		const session = await getSessionFunction();
		return listProjectsByUserId(session.user.id);
	});
