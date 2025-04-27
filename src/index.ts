import app from "./app";
import { registerAuthRoute } from "./routes/auth";
import { registerProjectRoute } from "./routes/project";
import { registerTeamRoute } from "./routes/team";
import { registerUserRoute } from "./routes/user";
import { PORT } from "./services/environment";

registerAuthRoute(app);
registerUserRoute(app);
registerTeamRoute(app);
registerProjectRoute(app);

// Start Server
app.listen(PORT);

console.log(
	`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
