import Elysia, { t } from "elysia";
import TableRepository from "../repositories/Table";

const tableSchema = t.Object({
	id: t.String(),
	name: t.String(),
});

export const tableRoute = new Elysia({
	prefix: "/tables",
	detail: { tags: ["Table"] },
})

	.decorate("repository", new TableRepository())

	.get("/", ({ repository }) => repository.index(), {
		response: t.Array(tableSchema),
	})

	.get("/:id", ({ repository, params }) => repository.find(params.id), {
		response: tableSchema,
	})

	.post(
		"/",
		({ set, repository, body }) => {
			set.status = 201;

			return repository.store({
				name: body.name,
			});
		},
		{
			body: t.Object({
				name: t.String(),
			}),
			response: tableSchema,
		},
	)

	.put(
		"/:id",
		({ repository, params, body }) =>
			repository.update(params.id, {
				name: body.name,
			}),
		{
			body: t.Object({
				name: t.Optional(t.String()),
			}),
			response: tableSchema,
		},
	)

	.delete("/:id", ({ repository, params: { id } }) => repository.destroy(id), {
		response: tableSchema,
	});
