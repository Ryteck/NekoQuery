import { t } from "elysia";
import type { AppContext } from "../app";
import userTypeBoxSchema from "../schemas/typeBox/user";
import type { PayloadSchema } from "../schemas/zod/payload";

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

						await user.validatePassword(password);

						const payload: PayloadSchema = { userId: user.render().id };

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
						return user?.render() || null;
					},
					{
						response: t.Nullable(t.Omit(userTypeBoxSchema, ["password"])),

						detail: {
							summary: "Get Current Session",
							description:
								"Returns the authenticated user's information if a valid session exists, otherwise returns null.",
						},
					},
				),
	);
