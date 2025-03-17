import { defineConfig } from "vite";

export default defineConfig({
	resolve: {
		alias: {
			slider: __dirname + "/../src/",
		},
	},
});
