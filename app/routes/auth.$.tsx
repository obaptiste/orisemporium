import shopify from "../shopify.server";
import type { LoaderArgs } from "@remix-run/node";

export async function loader({ request }: LoaderArgs) {
  await shopify.authenticate.admin(request);


  return null;
}
