import Elysia, { t } from "elysia";
import TableRepository from "../repositories/Table";

const tableSchema = t.Object({
	id: t.String(),
	name: t.String(),
	databaseConnectionId: t.String(),
});

export const tableRoute = new Elysia({
	prefix: "/tables",
	detail: { tags: ["Table"] },
})

	.decorate("tableRepository", new TableRepository())

	.get("/", ({ tableRepository }) => tableRepository.index(), {
		response: t.Array(tableSchema),
	})

	.get(
		"/:id",
		({ tableRepository, params }) => tableRepository.find(params.id),
		{
			response: tableSchema,
		},
	)

	.post(
		"/",
		({ set, tableRepository, body }) => {
			set.status = 201;

			return tableRepository.store({
				name: body.name,
				databaseConnectionId: body.databaseConnectionId,
			});
		},
		{
			body: t.Object({
				name: t.String(),
				databaseConnectionId: t.String(),
			}),
			response: tableSchema,
		},
	)

	.put(
		"/:id",
		({ tableRepository, params, body }) =>
			tableRepository.update(params.id, {
				name: body.name,
			}),
		{
			body: t.Object({
				name: t.Optional(t.String()),
			}),
			response: tableSchema,
		},
	)

	.delete(
		"/:id",
		({ tableRepository, params: { id } }) => tableRepository.destroy(id),
		{
			response: tableSchema,
		},
	);
