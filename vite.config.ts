import {
  vitePlugin as remix,
  cloudflareDevProxyVitePlugin as remixCloudflareDevProxy,
} from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

declare module "@remix-run/cloudflare" {
  interface Future {
    v3_singleFetch: true;
  }
}

export default defineConfig({
  plugins: [
    remixCloudflareDevProxy(),
    remix({
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
        v3_singleFetch: true,
        v3_lazyRouteDiscovery: true,
      },
    }),
    tsconfigPaths(),
  ],
  // Add noExternal to allow kit to be bundled
  ssr: {
    noExternal: ["@0xsequence/kit"],
  },
  resolve: {
    alias: {
      fs: "node:fs",
      buffer: "buffer/",
      stream: "node:stream",
      http: "node:http",
      https: "node:https",
      "fs/promises": "node:fs/promises",
    },
  },
});
