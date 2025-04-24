import { t } from "elysia";
import type { AppContext } from "../app";
import type { PayloadSchema } from "../schemas/payload";
import { userTypeBoxSchema } from "../schemas/user";

export const registerAuthRoute = (app: AppContext) =>
	app.group(
		"/auth",
		{
			detail: {
				tags: ["Auth"],
			},
		},

		(app) =>
			app
				// Login
				.post(
					"/login",
					async ({ body: { email, password }, userRepository, jwt }) => {
						const user = await userRepository.showByEmail(email);

						const isCorrectPassword = await Bun.password.verify(
							password,
							user.password,
						);

						if (!isCorrectPassword) throw new Error("Wrong Password");

						const payload: PayloadSchema = { userId: user.id };

						return jwt.sign(payload);
					},
					{
						body: t.Pick(userTypeBoxSchema, ["email", "password"]),

						response: t.String(),

						detail: {
							summary: "Authenticate User",
							description:
								"Validates user credentials and returns a JWT token upon successful authentication.",
						},
					},
				)

				// Session
				.get(
					"/session",
					async ({ user }) => {
						return user || null;
					},
					{
						response: t.Nullable(userTypeBoxSchema),

						detail: {
							summary: "Get Current Session",
							description:
								"Returns the authenticated user's information if a valid session exists, otherwise returns null.",
						},
					},
				),
	);
