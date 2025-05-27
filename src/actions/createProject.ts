"use server";

import { getSessionFunction } from "@/functions/getSession";
import { actionClient } from "@/lib/safe-action";
import { createNewProject } from "@/repositories/project";
import { z } from "zod";

const inputActionSchema = z.object({
	name: z.string(),
	nanoid: z.string(),
});

const outputActionSchema = z.object({
	id: z.string(),
	name: z.string(),
	userId: z.string(),
	createdAt: z.date(),
	updatedAt: z.date(),
});

export const createProjectAction = actionClient
	.schema(inputActionSchema)
	.outputSchema(outputActionSchema)
	.action(async ({ parsedInput }) => {
		const session = await getSessionFunction();

		return await createNewProject({
			name: parsedInput.name,
			userId: session.user.id,
		});
	});
