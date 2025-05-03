import userTypeBoxSchema from "@/schemas/typeBox/user";
import type { AppContext } from "@/server/app";
import { t } from "elysia";

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
				.get(
					"/",
					async ({ userRepository }) => {
						const userEntities = await userRepository.list();
						return userEntities.map((userEntity) => userEntity.render());
					},
					{
						response: t.Array(t.Omit(userTypeBoxSchema, ["password"])),

						detail: {
							summary: "List Users",
							description: "Retrieve a list of all registered users.",
						},
					},
				)

				// Create User
				.post(
					"/",
					async ({ body, userRepository }) => {
						const userEntity = await userRepository.store(body);
						return userEntity.render();
					},
					{
						body: t.Omit(userTypeBoxSchema, ["id", "publicKey"]),

						response: t.Omit(userTypeBoxSchema, ["password"]),

						detail: {
							summary: "Create User",
							description: "Create and store a new user in the system.",
						},
					},
				)

				// Show User
				.get(
					"/:id",
					async ({ params: { id }, userRepository }) => {
						const userEntity = await userRepository.show(id);
						return userEntity.render();
					},
					{
						params: t.Pick(userTypeBoxSchema, ["id"]),

						response: t.Omit(userTypeBoxSchema, ["password"]),

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
					async ({ params: { id }, body, userRepository }) => {
						const userEnity = await userRepository.update(id, body);
						return userEnity.render();
					},
					{
						params: t.Pick(userTypeBoxSchema, ["id"]),

						body: t.Partial(
							t.Omit(userTypeBoxSchema, ["id", "password", "publicKey"]),
						),

						response: t.Omit(userTypeBoxSchema, ["password"]),

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
					async ({ params: { id }, userRepository }) => {
						const userEntity = await userRepository.destroy(id);
						return userEntity.render();
					},
					{
						params: t.Pick(userTypeBoxSchema, ["id"]),

						response: t.Omit(userTypeBoxSchema, ["password"]),

						detail: {
							summary: "Delete User",
							description:
								"Delete a user from the system using their unique ID.",
						},
					},
				),
	);
