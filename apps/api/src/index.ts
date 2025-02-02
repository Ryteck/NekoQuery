import swagger from "@elysiajs/swagger";
import { Elysia } from "elysia";
import { tableRoute } from "./routes/table";
import { PORT } from "./services/environment";

new Elysia()

	.use(
		swagger({
			documentation: {
				tags: [
					{ name: "App", description: "General endpoints" },
					{ name: "Table", description: "Table repository endpoints" },
				],
			},
		}),
	)

	.get("/hello", "Hello via Elysia!", { detail: { tags: ["App"] } })

	.use(tableRoute)

	.listen(PORT, () =>
		console.log(`🚀 Server running at http://localhost:${PORT}`),
	);
