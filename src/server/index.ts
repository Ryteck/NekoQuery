import { SERVER_PORT } from "@/services/environment";
import app from "./app";
import { registerAuthRoute } from "./routes/auth";
import { registerProjectRoute } from "./routes/project";
import { registerTeamRoute } from "./routes/team";
import { registerUserRoute } from "./routes/user";

registerAuthRoute(app);
registerUserRoute(app);
registerTeamRoute(app);
registerProjectRoute(app);

// Start Server
app.listen(SERVER_PORT);

console.log(
	`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
