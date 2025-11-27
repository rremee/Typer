import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import handlebars from "vite-plugin-handlebars";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
	plugins: [
		handlebars({
			partialDirectory: resolve(__dirname, "src/partials"),
			context(pagePath) {
				const name = pagePath.replace(/^\//, "").replace(/\.html$/, "");
				let pageTitle = "";
				let pageScript = "";
				switch (name) {
					case "":
						pageTitle = "Home Page";
						pageScript = "script.js"; // script for certain page
						break;
					// different cases (pages) below
					default:
						pageTitle = "Page name";
						pageScript = "script.js"; // default script
				}
				return { pageTitle, pageScript };
			},
		}),
	],
	build: {
		rollupOptions: {
			input: {
				main: resolve(__dirname, "index.html"),
				// different pages below
			},
		},
	},
});
