import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

// Read license file and create banner
const license = readFileSync(resolve(__dirname, "LICENSE"), "utf-8");
const banner = `/**
${license
	.split("\n")
	.map((line) => ` * ${line}`.trimEnd())
	.join("\n")}
 */`;

export default defineConfig({
	esbuild: {
		banner,
	},
	build: {
		lib: {
			entry: resolve(__dirname, "src/index.ts"),
			name: "PkgName",
			formats: ["es", "cjs"],
			fileName: (format) => `index.${format === "es" ? "js" : "cjs"}`,
		},
		rollupOptions: {
			// Externalize deps that shouldn't be bundled into library
			external: [],
			output: {
				// Add license banner to each output file
				banner,
				// Provide global variables to use in the UMD build
				// for externalized deps
				globals: {},
			},
		},
		// Libraries should NOT be minified to preserve tree-shaking annotations
		// The consuming app's bundler will handle minification
		// If you must minify: use 'esbuild' (faster) or 'terser' (smaller)
		minify: false,
		// Include sourcemaps for better debugging experience
		// They're separate files, no runtime overhead
		sourcemap: true,
		// Report compressed size (useful for monitoring bundle size)
		reportCompressedSize: false,
		// Ensure CSS code splitting is disabled for library mode
		cssCodeSplit: false,
	},
	plugins: [
		dts({
			insertTypesEntry: true,
			rollupTypes: true,
		}),
	],
});
