import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { organization, user } from "./auth";

export const api = pgTable("api", {
	id: uuid("id").defaultRandom().notNull().primaryKey(),

	name: text("name").notNull(),

	baseUrl: text("base_url"),

	userId: text("user_id")
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),

	organizationId: text("organization_id").references(() => organization.id, {
		onDelete: "cascade",
	}),

	createdAt: timestamp("created_at").defaultNow().notNull(),

	updatedAt: timestamp("updated_at")
		.defaultNow()
		.notNull()
		.$onUpdateFn(() => new Date()),
});

export type ApiData = typeof api.$inferSelect;
export type InsertApiData = typeof api.$inferInsert;
