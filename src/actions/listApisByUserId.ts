"use server";

import { getSessionFunction } from "@/functions/getSession";
import { actionClient } from "@/lib/safe-action";
import { listApisByUserId } from "@/repositories/api";
import { z } from "zod";

const outputActionSchema = z
	.object({
		id: z.string().uuid(),
		name: z.string(),
		baseUrl: z.string().url().nullable(),
		userId: z.string(),
		organizationId: z.string().nullable(),
		createdAt: z.date(),
		updatedAt: z.date(),
	})
	.array();

export const listApisByUserIdAction = actionClient
	.outputSchema(outputActionSchema)
	.action(async () => {
		const session = await getSessionFunction();
		return listApisByUserId(session.user.id);
	});
