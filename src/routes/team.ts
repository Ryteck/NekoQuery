import { t } from "elysia";
import type { AppContext } from "../app";
import teamTypeBoxSchema from "../schemas/typeBox/team";

export const registerTeamRoute = (app: AppContext) =>
	app.group(
		"/teams",
		{
			detail: {
				tags: ["Team"],
			},
		},

		(app) =>
			app

				// List Teams
				.get(
					"/",
					async ({ teamRepository }) => {
						const teamsEntities = await teamRepository.list();
						return Promise.all(
							teamsEntities.map((teamEntity) => teamEntity.render()),
						);
					},
					{
						response: t.Array(t.Omit(teamTypeBoxSchema, ["userId"])),

						detail: {
							summary: "List Teams",
							description:
								"Retrieve a list of all teams available in the system.",
						},
					},
				)

				// Create Team
				.post(
					"/",
					async ({ body, teamRepository }) => {
						const teamEntity = await teamRepository.store(body);
						return teamEntity.render();
					},
					{
						body: t.Omit(teamTypeBoxSchema, ["id", "slug", "stamp"]),

						response: t.Omit(teamTypeBoxSchema, ["userId"]),

						detail: {
							summary: "Create Team",
							description: "Create a new team with the provided details.",
						},
					},
				)

				// Show Team
				.get(
					"/:id",
					async ({ params: { id }, teamRepository }) => {
						const teamEntity = await teamRepository.show(id);
						return teamEntity.render();
					},
					{
						params: t.Pick(teamTypeBoxSchema, ["id"]),

						response: t.Omit(teamTypeBoxSchema, ["userId"]),

						detail: {
							summary: "Show Team",
							description: "Retrieve the details of a specific team by its ID.",
						},
					},
				)

				// Update Team
				.put(
					"/:id",
					async ({ params: { id }, body, teamRepository }) => {
						const userEnity = await teamRepository.update(id, body);
						return userEnity.render();
					},
					{
						params: t.Pick(teamTypeBoxSchema, ["id"]),

						body: t.Partial(
							t.Omit(teamTypeBoxSchema, ["id", "userId", "slug", "stamp"]),
						),

						response: t.Omit(teamTypeBoxSchema, ["userId"]),

						detail: {
							summary: "Update Team",
							description:
								"Update the information of an existing team by its ID.",
						},
					},
				)

				// Delete Team
				.delete(
					"/:id",
					async ({ params: { id }, teamRepository }) => {
						const teamEntity = await teamRepository.destroy(id);
						return teamEntity.render();
					},
					{
						params: t.Pick(teamTypeBoxSchema, ["id"]),

						response: t.Omit(teamTypeBoxSchema, ["userId"]),

						detail: {
							summary: "Delete Team",
							description: "Delete an existing team by its ID.",
						},
					},
				),
	);
