import {
  vitePlugin as remix,
  cloudflareDevProxyVitePlugin as remixCloudflareDevProxy,
} from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { nodePolyfills } from "vite-plugin-node-polyfills";
declare module "@remix-run/cloudflare" {
  interface Future {
    v3_singleFetch: true;
  }
}

export default defineConfig({
  plugins: [
    nodePolyfills({
      // To add only specific polyfills, add them here. If no option is passed, adds all polyfills
      include: ["crypto", "events", "util", "stream", "vm"],
    }),
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
      zlib: "node:zlib",
      os: "node:os",
      path: "node:path",
      process: "node:process",
      net: "node:net",
      tls: "node:tls",
      child_process: "node:child_process",
      url: "node:url",
      crypto: "crypto",
      events: "events",
      util: "util",
      "node:crypto": "crypto",
      "node:events": "events",
      "node:util": "util",
    },
  },
});
