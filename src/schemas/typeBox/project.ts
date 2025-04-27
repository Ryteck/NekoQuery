import { t } from "elysia";

const projectTypeBoxSchema = t.Object({
	id: t.String({
		format: "uuid",
		description:
			"Unique identifier for the project, represented in UUID format.",
	}),
	name: t.String({
		description: "Name of the project.",
	}),
	teamId: t.String({
		format: "uuid",
		description: "Unique identifier of the team associated with the project.",
	}),
	slug: t.String({
		description:
			"URL-friendly identifier for the project, typically used in web routes.",
	}),
	stamp: t.String({
		description:
			"Timestamp or version marker associated with the project data.",
	}),
});

export default projectTypeBoxSchema;
