import handlebars from "handlebars";
import { join } from "path";

// 🎨 Handlebars template engine configuration

// ⚙️ Views directory
const VIEWS_DIR = join(Deno.cwd(), "src/views");

// 🖼️ Renders a view with data
export async function renderView(viewName: string, data: Record<string, unknown> = {}) {
	try {
		// 📄 Read the template file
		const viewPath = join(VIEWS_DIR, `${viewName}.hbs`);
		const templateContent = await Deno.readTextFile(viewPath);

		// 🔄 Compile the template
		const template = handlebars.compile(templateContent);

		// 📊 Render with data
		return template(data);
	} catch (error) {
		console.error(`❌ Error rendering view ${viewName}:`, error);
		throw error;
	}
}