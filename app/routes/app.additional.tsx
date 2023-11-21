import {
  Card,
  Layout,
  Link,
  List,
  Page,
  Text,
  VerticalStack,
} from "@shopify/polaris";
import { boundary } from "@shopify/shopify-app-remix/server";

// import OpenAI from "openai";
// import { OpenAIStream, StreamingTextResponse } from "ai";

// import Upload from "../pages/upload";
import { Suspense } from "react";
import ProductDescriptor from "~/pages/prodDescriptor";
// import escapeHtml from "escape-html";
import { useRouteError } from "@remix-run/react";
import type { ActionArgs, LoaderFunction, LoaderArgs } from "@remix-run/node";
// import OpenAI from "openai";
import { authenticate } from "~/shopify.server";
import authenticatedFetch from "@shopify/app-bridge";
// import AnalyseImage from "~/components/analyseImage";


export const runtime = 'edge';

export function ErrorBoundary() {
  return boundary.error(useRouteError());
}
// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

export async function loader({
  request
}:LoaderArgs) {
  return null
}

 //const {session} = await authenticate.admin(request);
// const { visiontoken } = await cloudvisionApi.authenticate(session);


//  // const apiUrl = "/api/completions";
//  return json({ apiKey: process.env.SHOPIFY_API_KEY || "" });
// }

// export async function action({ request }: ActionArgs) {
//   const {session} = await authenticate.admin(request);
//   return
// }


export default function AdditionalPage() {
  //const { apiKey } = useLoaderData<typeof loader>();

  return (
    //<AppProvider isEmbeddedApp apiKey={apiKey}>

    <Page>
      <ui-title-bar title="AI Speed Padder" />
      <Layout>
        <Layout.Section>
          <Card>
            <VerticalStack gap="3">
              <Text as="p" variant="bodyMd">
                Simply upload an image, add some tags and GPT's api will add a
                description and suggested price
                {/* To create your own page and have it show up in the app
                navigation, add a page inside <Code>app/routes</Code>, and a
                link to it in the <Code>&lt;ui-nav-menu&gt;</Code> component
                found in <Code>app/routes/app.jsx</Code>. */}
              </Text>
              <Suspense>
                <ProductDescriptor />
              </Suspense>
              {/* <Suspense>
                <AnalyseImage imageUrl={'https://cdn.shopify.com/s/files/1/0827/0925/0336/files/oil_placeholder2.jpg?v=1695438431'}/>
              </Suspense> */}
            </VerticalStack>
          </Card>
        </Layout.Section>
        <Layout.Section secondary>
          <Card>
            <VerticalStack gap="2">
              <Text as="h2" variant="headingMd">
                Resources
              </Text>
              <List spacing="extraTight">
                <List.Item>
                  <Link
                    url="https://shopify.dev/docs/apps/design-guidelines/navigation#app-nav"
                    target="_blank"
                  >
                    App nav best practices
                  </Link>
                </List.Item>
              </List>
            </VerticalStack>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  // </AppProvider>
  );
}



// Shopify needs Remix to catch some thrown responses, so that their headers are included in the response.
// export function ErrorBoundary() {
//   return boundary.error(useRouteError());
// }

// export const headers = (headersArgs) => {
//   return boundary.headers(headersArgs);
// };

