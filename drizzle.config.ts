import { defineConfig } from "drizzle-kit";

export default defineConfig({
	out: "./drizzle",
	schema: "./src/db/schema",
	dialect: "postgresql",
	dbCredentials: {
		url: String(process.env.DATABASE_URL),
	},
});
