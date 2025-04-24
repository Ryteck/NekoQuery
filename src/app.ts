import jwt from "@elysiajs/jwt";
import { swagger } from "@elysiajs/swagger";
import { Elysia } from "elysia";
import UserRepository from "./repositories/User";
import payloadSchema from "./schemas/payload";
import { JWT_SECRET } from "./services/environment";

const app = new Elysia()

	// Instance user repository
	.decorate("userRepository", new UserRepository())

	// Swagger Plugin
	.use(
		swagger({
			documentation: {
				info: {
					title: "NekoQuery API Documentation",
					version: "1.0.0",
				},
				tags: [
					{
						name: "Auth",
						description:
							"Authentication endpoints including login and session validation using JWT.",
					},
					{
						name: "User",
						description:
							"Endpoints related to user management, including registration, authentication, profile updates, and user information retrieval.",
					},
				],
				components: {
					securitySchemes: {
						bearerAuth: {
							type: "http",
							scheme: "bearer",
							bearerFormat: "JWT",
						},
					},
				},
			},
		}),
	)

	// JWT Plugin
	.use(
		jwt({
			secret: JWT_SECRET,
		}),
	)

	.derive(async ({ jwt, headers, userRepository }) => {
		const auth = headers.authorization;

		if (!auth) return;

		const [prefix, token] = auth.split(" ");

		if (prefix !== "Bearer") return;

		const payload = await jwt.verify(token);

		const { success, data } = payloadSchema.safeParse(payload);

		if (!success) return;

		const user = await userRepository.show(data.userId);

		return { user };
	});

export type AppContext = typeof app;

export default app;
