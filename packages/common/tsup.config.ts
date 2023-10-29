import { defineConfig } from "tsup";
import type { Options } from "tsup";

const options: Options = {
  format: ["cjs", "esm"],
  entry: ["{src,src/experimental}/*.{ts,tsx}", "!**/*.{spec,test,test-d}.*"],
  sourcemap: true,
  dts: true,
  splitting: false,
};

export default defineConfig(options);
