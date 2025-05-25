import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { user } from "./auth";

export const project = pgTable("project", {
	id: uuid("id").defaultRandom().notNull().primaryKey(),

	name: text("name").notNull(),

	userId: text("user_id")
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),

	createdAt: timestamp("created_at").defaultNow().notNull(),

	updatedAt: timestamp("updated_at")
		.defaultNow()
		.notNull()
		.$onUpdateFn(() => new Date()),
});

export type ProjectData = typeof project.$inferSelect;
export type InsertProjectData = typeof project.$inferInsert;
