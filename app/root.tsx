import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";

import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { AppProvider } from "@shopify/shopify-app-remix/react";
import shopify from "./shopify.server";

// dotenv.config();

export async function
  loader({ request }: LoaderArgs) {
    await shopify.authenticate.admin(request);

    return json({
      apiKey: process.env.SHOPIFY_API_KEY,
    });
  }

export default function App() {
  const { apiKey } = useLoaderData<typeof loader>();
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <AppProvider apiKey={apiKey}>

        <Outlet />
        <ScrollRestoration />
        <LiveReload />
        </AppProvider>
      </body>
    </html>
  );
}
