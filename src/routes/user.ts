import { t } from "elysia";
import type { AppContext } from "../app";
import { userTypeBoxSchema } from "../schemas/user";

export const registerUserRoute = (app: AppContext) =>
	app.group(
		"/users",
		{
			detail: {
				tags: ["User"],
			},
		},

		(app) =>
			app

				// List Users
				.get("/", ({ userRepository }) => userRepository.list(), {
					response: t.Array(userTypeBoxSchema),

					detail: {
						summary: "List Users",
						description: "Retrieve a list of all registered users.",
					},
				})

				// Create User
				.post(
					"/",
					async ({ body, userRepository }) => {
						body.password = await Bun.password.hash(body.password);
						return userRepository.store(body);
					},
					{
						body: t.Omit(userTypeBoxSchema, ["id"]),

						response: userTypeBoxSchema,

						detail: {
							summary: "Create User",
							description: "Create and store a new user in the system.",
						},
					},
				)

				// Show User
				.get(
					"/:id",
					({ params: { id }, userRepository }) => userRepository.show(id),
					{
						response: userTypeBoxSchema,

						detail: {
							summary: "Show User",
							description:
								"Retrieve detailed information for a specific user by their unique ID.",
						},
					},
				)

				// Update User
				.put(
					"/:id",
					({ params: { id }, body, userRepository }) =>
						userRepository.update(id, body),
					{
						body: t.Partial(t.Omit(userTypeBoxSchema, ["id", "password"])),

						response: userTypeBoxSchema,

						detail: {
							summary: "Update User",
							description:
								"Update the information of an existing user identified by their unique ID.",
						},
					},
				)

				// Delete User
				.delete(
					"/:id",
					({ params: { id }, userRepository }) => userRepository.destroy(id),
					{
						response: userTypeBoxSchema,

						detail: {
							summary: "Delete User",
							description:
								"Delete a user from the system using their unique ID.",
						},
					},
				),
	);
