import teamTypeBoxSchema from "@/schemas/typeBox/team";
import type { AppContext } from "@/server/app";
import { t } from "elysia";

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

				.derive(({ user, headers }) => {
					if (!user) throw "Unauthorized";

					return { user };
				})

				// List Teams
				.get(
					"/",
					async ({ user, teamRepository }) => {
						const renderedUser = user.render();

						const teamsEntities = await teamRepository.list(renderedUser);

						return Promise.all(
							teamsEntities.map((teamEntity) => teamEntity.render()),
						);
					},
					{
						response: t.Array(teamTypeBoxSchema),

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
					async ({ user, headers, body, teamRepository }) => {
						const renderedUser = user.render();
						const secretKey = headers.secret_key;

						const teamEntity = await teamRepository.store(
							renderedUser,
							body,
							secretKey,
						);

						return teamEntity.render();
					},
					{
						headers: t.Object({
							secret_key: t.String({
								description:
									"Secret key required to decrypt and access team-specific credentials.",
							}),
						}),

						body: t.Omit(teamTypeBoxSchema, ["id", "slug", "stamp"]),

						response: teamTypeBoxSchema,

						detail: {
							summary: "Create Team",
							description: "Create a new team with the provided details.",
						},
					},
				)

				// Show Team NanoId
				.get(
					"/:id/nano-id",
					async ({
						user,
						headers,
						params: { id },
						teamRepository,
						participantRepository,
					}) => {
						const renderedUser = user.render();
						const secretKey = headers.secret_key;

						const teamEntity = await teamRepository.show(id, renderedUser);
						const renderedTeam = teamEntity.render();

						const nanoId = await participantRepository.getNanoId(
							renderedUser,
							renderedTeam,
							secretKey,
						);

						return { nanoId };
					},
					{
						headers: t.Object({
							secret_key: t.String({
								description:
									"Secret key required to decrypt and access team-specific credentials.",
							}),
						}),

						params: t.Pick(teamTypeBoxSchema, ["id"]),

						response: t.Object({
							nanoId: t.String({
								description:
									"Obfuscated identifier associated with the team, used for client-side cryptographic operations.",
							}),
						}),

						detail: {
							summary: "Get team NanoId",
							description:
								"Returns an obfuscated identifier (`nanoId`) tied to the specified team, intended for use in cryptographic operations on the client side. Requires a valid secret key in the request headers.",
						},
					},
				)

				// Update Team
				.put(
					"/:id",
					async ({ user, params: { id }, body, teamRepository }) => {
						const renderedUser = user.render();

						const userEnity = await teamRepository.update(
							id,
							renderedUser,
							body,
						);

						return userEnity.render();
					},
					{
						params: t.Pick(teamTypeBoxSchema, ["id"]),

						body: t.Partial(t.Omit(teamTypeBoxSchema, ["id", "slug", "stamp"])),

						response: teamTypeBoxSchema,

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
					async ({ user, params: { id }, teamRepository }) => {
						const renderedUser = user.render();

						const teamEntity = await teamRepository.destroy(id, renderedUser);

						return teamEntity.render();
					},
					{
						params: t.Pick(teamTypeBoxSchema, ["id"]),

						response: teamTypeBoxSchema,

						detail: {
							summary: "Delete Team",
							description: "Delete an existing team by its ID.",
						},
					},
				),
	);
