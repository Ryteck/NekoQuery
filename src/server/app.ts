import ParticipantRepository from "@/repositories/Participant";
import ProjectRepository from "@/repositories/Project";
import TeamRepository from "@/repositories/Team";
import UserRepository from "@/repositories/User";
import payloadSchema from "@/schemas/zod/payload";
import { JWT_SECRET } from "@/services/environment";
import jwt from "@elysiajs/jwt";
import { swagger } from "@elysiajs/swagger";
import { Elysia } from "elysia";

const app = new Elysia()

	// Instance repositories
	.decorate("userRepository", new UserRepository())
	.decorate("teamRepository", new TeamRepository())
	.decorate("projectRepository", new ProjectRepository())
	.decorate("participantRepository", new ParticipantRepository())

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
					{
						name: "Team",
						description:
							"Endpoints for team management, covering creation, retrieval, updating, and association of teams with users.",
					},
					{
						name: "Project",
						description:
							"Endpoints for project management, including project creation, listing, updating, and team association.",
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
