import { type DefineConfigItem, defineConfig } from "bunup";

const license = await Bun.file("LICENSE").text();
const banner = `/**\n${license
	.split("\n")
	.map((line) => ` * ${line}`.trimEnd())
	.join("\n")}\n */`;

const config: DefineConfigItem = defineConfig({
	entry: "src/index.ts",
	format: ["esm", "cjs"],
	dts: true,
	sourcemap: "linked",
	banner,
	exports: true,
	unused: true,
}) as DefineConfigItem;

export default config;
