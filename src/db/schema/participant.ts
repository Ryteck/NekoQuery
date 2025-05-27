import {
	pgEnum,
	pgTable,
	text,
	timestamp,
	unique,
	uuid,
} from "drizzle-orm/pg-core";
import { user } from "./auth";
import { project } from "./project";

export const participantRole = pgEnum("participant_role", [
	"owner",
	"editor",
	"viewer",
]);

export const participant = pgTable(
	"participant",
	{
		id: uuid("id").defaultRandom().notNull().primaryKey(),

		userId: text("user_id")
			.notNull()
			.references(() => user.id, { onDelete: "cascade" }),

		projectId: uuid("project_id")
			.notNull()
			.references(() => project.id, { onDelete: "cascade" }),

		role: participantRole("role").notNull(),

		createdAt: timestamp("created_at").defaultNow().notNull(),

		updatedAt: timestamp("updated_at")
			.defaultNow()
			.notNull()
			.$onUpdateFn(() => new Date()),
	},
	(t) => [unique().on(t.userId, t.projectId)],
);

export type ParticipantData = typeof participant.$inferSelect;
export type InsertParticipantData = typeof participant.$inferInsert;
