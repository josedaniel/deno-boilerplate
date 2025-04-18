import { load } from "dotenv";
import { Application } from "oak";
import { join } from "path";
import { configureRouter } from "./src/config/routes.ts";
import { testConnection } from "./src/config/database.ts";
import { syncPetModel } from "./src/models/Pet.ts";

// 🚀 Main function
async function main() {
	// 📝 Load environment variables
	const env = await load();
	const PORT = parseInt(env.PORT || "8080");

	// 🗄️ Initialize database connection
	const dbConnected = await testConnection();
	if (!dbConnected) {
		console.error("❌ Failed to connect to the database. Exiting...");
		Deno.exit(1);
	}

	// 📊 Sync models with the database
	await syncPetModel();

	// 🌳 Create Oak application
	const app = new Application();

	// 📂 Configure static middleware for public files
	app.use(async (ctx, next) => {
		try {
			await ctx.send({
				root: join(Deno.cwd(), "assets/public"),
				index: "index.html",
			});
		} catch {
			await next();
		}
	});

	// 🔌 Configure routes
	configureRouter(app);

	// 🎯 Error handling middleware
	app.use(async (ctx, next) => {
		try {
			await next();
		} catch (err) {
			console.error("❌ Error:", err);
			ctx.response.status = 500;
			ctx.response.body = { error: "Internal server error" };
		}
	});

	// 🚦 Start the server
	console.log(`🌐 Server started at http://localhost:${PORT}`);
	await app.listen({ port: PORT });
}

// ▶️ Run the application
if (import.meta.main) {
	main().catch(console.error);
}