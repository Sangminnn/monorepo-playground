import { defineConfig } from "tsup";

import type { Options } from "tsup";

const options: Options = {
  format: ["cjs", "esm"],
  entry: ["src/index.ts", "{src}/*.{ts,tsx}"],
  sourcemap: true,
  dts: true,
  splitting: false,
  clean: true,
};

export default defineConfig(options);
