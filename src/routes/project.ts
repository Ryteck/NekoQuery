import { t } from "elysia";
import type { AppContext } from "../app";
import projectTypeBoxSchema from "../schemas/typeBox/project";

export const registerProjectRoute = (app: AppContext) =>
	app.group(
		"/projects",
		{
			detail: {
				tags: ["Project"],
			},
		},

		(app) =>
			app

				// List Projects
				.get(
					"/",
					async ({ projectRepository }) => {
						const projectsEntities = await projectRepository.list();
						return Promise.all(
							projectsEntities.map((projectEntity) => projectEntity.render()),
						);
					},
					{
						response: t.Array(t.Omit(projectTypeBoxSchema, ["teamId"])),

						detail: {
							summary: "List Projects",
							description:
								"Retrieve a list of all projects available in the system.",
						},
					},
				)

				// Create Project
				.post(
					"/",
					async ({ body, projectRepository }) => {
						const projectEntity = await projectRepository.store(body);
						return projectEntity.render();
					},
					{
						body: t.Omit(projectTypeBoxSchema, ["id", "slug", "stamp"]),

						response: t.Omit(projectTypeBoxSchema, ["teamId"]),

						detail: {
							summary: "Create Project",
							description: "Create a new project with the provided details.",
						},
					},
				)

				// Show Project
				.get(
					"/:id",
					async ({ params: { id }, projectRepository }) => {
						const projectEntity = await projectRepository.show(id);
						return projectEntity.render();
					},
					{
						params: t.Pick(projectTypeBoxSchema, ["id"]),

						response: t.Omit(projectTypeBoxSchema, ["teamId"]),

						detail: {
							summary: "Show Project",
							description:
								"Retrieve the details of a specific project by its ID.",
						},
					},
				)

				// Update Project
				.put(
					"/:id",
					async ({ params: { id }, body, projectRepository }) => {
						const userEnity = await projectRepository.update(id, body);
						return userEnity.render();
					},
					{
						params: t.Pick(projectTypeBoxSchema, ["id"]),

						body: t.Partial(
							t.Omit(projectTypeBoxSchema, ["id", "teamId", "slug", "stamp"]),
						),

						response: t.Omit(projectTypeBoxSchema, ["teamId"]),

						detail: {
							summary: "Update Project",
							description:
								"Update the information of an existing project by its ID.",
						},
					},
				)

				// Delete Project
				.delete(
					"/:id",
					async ({ params: { id }, projectRepository }) => {
						const projectEntity = await projectRepository.destroy(id);
						return projectEntity.render();
					},
					{
						params: t.Pick(projectTypeBoxSchema, ["id"]),

						response: t.Omit(projectTypeBoxSchema, ["teamId"]),

						detail: {
							summary: "Delete Project",
							description: "Delete an existing project by its ID.",
						},
					},
				),
	);
