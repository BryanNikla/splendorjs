import {resolve} from "path";
import {defineConfig} from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
    build: {
        lib: {
            entry: resolve(__dirname, "src/splendor.ts"),
            name: "SplendorJS",
            fileName: (format) => `index.${format}.js`,
        },
        rollupOptions: {},
    },
    plugins: [dts()],
});
