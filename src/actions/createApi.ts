"use server";

import { getSessionFunction } from "@/functions/getSession";
import { actionClient } from "@/lib/safe-action";
import { createNewApi } from "@/repositories/api";
import { z } from "zod";

const inputActionSchema = z.object({
	name: z.string(),
	baseUrl: z.string().url().nullable(),
	organizationId: z.string().nullable(),
});

const outputActionSchema = z.object({
	id: z.string().uuid(),
	name: z.string(),
	baseUrl: z.string().url().nullable(),
	userId: z.string(),
	organizationId: z.string().nullable(),
	createdAt: z.date(),
	updatedAt: z.date(),
});

export const createApiAction = actionClient
	.schema(inputActionSchema)
	.outputSchema(outputActionSchema)
	.action(async ({ parsedInput }) => {
		const session = await getSessionFunction();

		return createNewApi({
			name: parsedInput.name,
			baseUrl: parsedInput.baseUrl,
			userId: session.user.id,
			organizationId: parsedInput.organizationId,
		});
	});
