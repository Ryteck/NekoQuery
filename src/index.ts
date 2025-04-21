import { swagger } from "@elysiajs/swagger";
import { Elysia } from "elysia";
import userRoute from "./routes/user";
import { PORT } from "./services/environment";

const app = new Elysia()

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
						name: "User",
						description:
							"Endpoints related to user management, including registration, authentication, profile updates, and user information retrieval.",
					},
				],
			},
		}),
	)

	// User
	.use(userRoute)

	// Start Server
	.listen(PORT);

console.log(
	`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
