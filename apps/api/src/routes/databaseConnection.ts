import Elysia, { t } from "elysia";
import DatabaseConnectionRepository from "../repositories/DatabaseConnection";

const databaseConnectionSchema = t.Object({
	id: t.String(),
	name: t.String(),
	url: t.String(),
});

export const databaseConnectionRoute = new Elysia({
	prefix: "/database-connections",
	detail: { tags: ["DatabaseConnection"] },
})

	.decorate("databaseConnectionRepository", new DatabaseConnectionRepository())

	.get(
		"/",
		({ databaseConnectionRepository }) => databaseConnectionRepository.index(),
		{
			response: t.Array(databaseConnectionSchema),
		},
	)

	.get(
		"/:id",
		({ databaseConnectionRepository, params }) =>
			databaseConnectionRepository.find(params.id),
		{
			response: databaseConnectionSchema,
		},
	)

	.post(
		"/",
		({ set, databaseConnectionRepository, body }) => {
			set.status = 201;

			return databaseConnectionRepository.store({
				name: body.name,
				url: body.url,
			});
		},
		{
			body: t.Object({
				name: t.String(),
				url: t.String(),
			}),
			response: databaseConnectionSchema,
		},
	)

	.put(
		"/:id",
		({ databaseConnectionRepository, params, body }) =>
			databaseConnectionRepository.update(params.id, {
				name: body.name,
				url: body.url,
			}),
		{
			body: t.Object({
				name: t.Optional(t.String()),
				url: t.Optional(t.String()),
			}),
			response: databaseConnectionSchema,
		},
	)

	.delete(
		"/:id",
		({ databaseConnectionRepository, params: { id } }) =>
			databaseConnectionRepository.destroy(id),
		{
			response: databaseConnectionSchema,
		},
	);
