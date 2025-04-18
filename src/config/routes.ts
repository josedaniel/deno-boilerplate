import { Router, Application } from "oak";
import { renderView } from "./renderer.ts";
import { PetController } from "../controllers/PetController.ts";

// 🔀 Router configuration
export function configureRouter(app: Application) {
	const router = new Router();

	// 🏠 Home route that renders the home view
	router.get("/", async (ctx) => {
		ctx.response.body = await renderView("home", {
			title: "Deno Boilerplate",
			message: "Welcome to your Deno application!"
		});
	});

	// ℹ️ Example API route
	router.get("/api/info", (ctx) => {
		ctx.response.body = {
			name: "Deno Boilerplate API",
			version: "1.0.0",
			deno: Deno.version.deno,
			typescript: Deno.version.typescript
		};
	});

	// 🐾 Pet API routes
	router
		.get("/api/pets", PetController.getAll)
		.get("/api/pets/:id", PetController.getById)
		.post("/api/pets", PetController.create)
		.put("/api/pets/:id", PetController.update)
		.delete("/api/pets/:id", PetController.delete);

	// 📚 Add routes to the application
	app.use(router.routes());
	app.use(router.allowedMethods());
}