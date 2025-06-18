"use server";

import { getSessionFunction } from "@/functions/getSession";
import { actionClient } from "@/lib/safe-action";
import { deleteApiById } from "@/repositories/api";
import { z } from "zod";

const inputActionSchema = z.string().uuid();

const outputActionSchema = z.object({
	id: z.string().uuid(),
	name: z.string(),
	baseUrl: z.string().url().nullable(),
	userId: z.string(),
	organizationId: z.string().nullable(),
	createdAt: z.date(),
	updatedAt: z.date(),
});

export const deleteApiByIdAction = actionClient
	.schema(inputActionSchema)
	.outputSchema(outputActionSchema)
	.action(async ({ parsedInput }) => {
		const session = await getSessionFunction();

		return deleteApiById({
			id: parsedInput,
			userId: session.user.id,
		});
	});
