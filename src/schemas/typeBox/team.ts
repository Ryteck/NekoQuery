import { t } from "elysia";

const teamTypeBoxSchema = t.Object({
	id: t.String({
		format: "uuid",
		description: "Unique identifier for the team, represented in UUID format.",
	}),
	name: t.String({
		description: "Name of the team.",
	}),
	userId: t.String({
		format: "uuid",
		description: "Unique identifier of the user who owns or created the team.",
	}),
	slug: t.String({
		description:
			"URL-friendly identifier for the team, typically used in web routes.",
	}),
	stamp: t.String({
		description: "Timestamp or version marker associated with the team data.",
	}),
});

export default teamTypeBoxSchema;
