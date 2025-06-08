"use server";

import { getSessionFunction } from "@/functions/getSession";
import { actionClient } from "@/lib/safe-action";
import { deleteProjectById } from "@/repositories/project";
import { z } from "zod";

const inputActionSchema = z.string().uuid();

const outputActionSchema = z.object({
	id: z.string(),
	name: z.string(),
	userId: z.string(),
	createdAt: z.date(),
	updatedAt: z.date(),
});

export const deleteProjectByIdAction = actionClient
	.schema(inputActionSchema)
	.outputSchema(outputActionSchema)
	.action(async ({ parsedInput }) => {
		const session = await getSessionFunction();

		return deleteProjectById({
			id: parsedInput,
			userId: session.user.id,
		});
	});
