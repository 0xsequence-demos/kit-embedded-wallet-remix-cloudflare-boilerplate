import type { LinksFunction } from "@remix-run/cloudflare";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import { LoaderFunctionArgs, MetaFunction } from "@remix-run/cloudflare";
import { createConfig, SequenceKit } from "@0xsequence/kit";

// Styles
import styles from "@0xsequence/design-system/styles.css?url";
import indexCss from "./index.css?url";
import { GithubCorner } from "~/components/GithubCorner";

export const meta: MetaFunction = () => {
  return [
    { title: "Sequence Embedded Wallet - Remix Cloudflare Kit Starter" },
    {
      description:
        "A Remix Cloudflare starter kit for Sequence Embedded Wallet",
    },
  ];
};

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: styles },
  { rel: "stylesheet", href: indexCss },
  { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export async function loader({ request, context }: LoaderFunctionArgs) {
  const env = context.cloudflare.env;

  const url = new URL(request.url);
  const origin = url.origin;
  const pathname = url.pathname;

  return {
    projectAccessKey: env.PROJECT_ACCESS_KEY,
    waasConfigKey: env.WAAS_CONFIG_KEY,
    googleClientId: env.GOOGLE_CLIENT_ID,
    appleClientId: env.APPLE_CLIENT_ID,
    appleRedirectURI: origin + pathname,
    walletConnectProjectId: env.WALLET_CONNECT_ID,
  };
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const {
    projectAccessKey,
    waasConfigKey,
    googleClientId,
    appleClientId,
    appleRedirectURI,
    walletConnectProjectId,
  } = useLoaderData<typeof loader>();

  const config = createConfig("waas", {
    projectAccessKey,
    chainIds: [1, 421614],
    defaultChainId: 421614,
    appName: "Kit Starter",
    waasConfigKey,
    googleClientId,
    appleClientId,
    appleRedirectURI,
    walletConnectProjectId,
  });

  return (
    <SequenceKit config={config}>
      <div id="root">
        <GithubCorner to="https://github.com/0xsequence-demos/kit-embedded-wallet-remix-cloudflare-boilerplate" />
        <Outlet />
      </div>
    </SequenceKit>
  );
}
