import { useEffect } from "react";
import { json, LoaderFunction } from  "@remix-run/node";
import {
  useActionData,
  useLoaderData,
  Link,
  useNavigate,
  useNavigation,
  useSubmit,
} from "@remix-run/react";
import {
  Page,
  Layout,
  Text,
  Card,
  Button,
  HorizontalStack,
  EmptyState,
  IndexTable,
  Thumbnail,
  Icon,
} from "@shopify/polaris";

import { authenticate } from "../shopify.server";

import { getQRCodes } from "~/models/QRCode.server";
import { DiamondAlertMajor, ImageMajor } from "@shopify/polaris-icons";
import { analyzeImage } from "~/models/image-recognition";
import { generateDescription } from "~/models/gpt";
import { default as stream } from 'node:stream';
import type { ReadableStream } from 'node:stream/web';

/**
@imageFile object image file
@return ReadableStream<Uint8Array>
@description Analyze image file and return ReadableStream<Uint8Array>
@example
const imageFile = await request.blob();
const response = await analyzeImage(imageFile)
stream.Readable.fromWeb(response.body as ReadableStream<Uint8Array>)
**/

// const response = await analyzeImage(imageFile)
// stream.Readable.fromWeb(response.body as ReadableStream<Uint8Array>)


export let loader: LoaderFunction = async ({ request }) => {
  const { admin, session } = await authenticate.admin(request);
  // const response = await fetch(analyseImage(imageFile))
  // let imageFileBlob = await request.blob();

  // const chunks: any[] = [];
  // for (const chunk of await imageFileBlob.stream().getReader().read()) {
  //   chunks.push(chunk);



  // if (imageFile) {
  //   const labels = await analyzeImage(imageFile);
  //   const description = await generateDescription(labels);
   const qrCodes = await getQRCodes(session.shop, admin.graphql);

  return json({
    qrCodes,
    //description
  });

}




const EmptyQRCodeState = ({ onAction }) => (
  <EmptyState
    heading="Create unique QR codes for your product"
    action={{ content: "Create QR code", onAction }}
    image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
  >
    <p>Allow customers to scan codes and buy products using their phones.</p>
  </EmptyState>
);

function truncate(str, { length = 25 } = {}) {
  if (!str) return "";
  if (str.length <= length) return str;
  return str.slice(0, length) + "…";
}

const QRTable = ({ qrCodes }) => (
  <IndexTable
    resourceName={{
      singular: "QR code",
      plural: "QR codes",
    }}
    itemCount={qrCodes.length}
    headings={[
      { title: "Thumbnail", hidden: true },
      { title: "Title" },
      { title: "Product" },
      { title: "Date created" },
      { title: "Scans" },
    ]}
    selectable={false}
  >
    {qrCodes.map((qrCode) => (
      <QRTableRow key={qrCode.id} qrCode={qrCode} />
    ))}
  </IndexTable>
);

const QRTableRow = ({ qrCode }) => (
  <IndexTable.Row id={qrCode.id} position={qrCode.id}>
    <IndexTable.Cell>
      <Thumbnail
        source={qrCode.productImage || ImageMajor}
        alt={qrCode.productTitle}
        size="small"
      />
    </IndexTable.Cell>
    <IndexTable.Cell>
      <Link to={`qrcodes/${qrCode.id}`}>{truncate(qrCode.title)}</Link>
    </IndexTable.Cell>
    <IndexTable.Cell>
      {qrCode.productDeleted ? (
        <HorizontalStack align="start" gap="2">
          <span style={{ width: "20px" }}>
            <Icon source={DiamondAlertMajor} color="critical" />
          </span>
          <Text color="critical" as="span">
            product has been deleted
          </Text>
        </HorizontalStack>
      ) : (
        truncate(qrCode.productTitle)
      )}
    </IndexTable.Cell>
    <IndexTable.Cell>
      {new Date(qrCode.createdAt).toDateString()}
    </IndexTable.Cell>
    <IndexTable.Cell>{qrCode.scans}</IndexTable.Cell>
  </IndexTable.Row>
);

export async function action({ request }) {
  const { admin } = await authenticate.admin(request);

  const color = ["Red", "Orange", "Yellow", "Green"][
    Math.floor(Math.random() * 4)
  ];
  const response = await admin.graphql(
    `#graphql
      mutation populateProduct($input: ProductInput!) {
        productCreate(input: $input) {
          product {
            id
            title
            handle
            status
            variants(first: 10) {
              edges {
                node {
                  id
                  price
                  barcode
                  createdAt
                }
              }
            }
          }
        }
      }`,
    {
      variables: {
        input: {
          title: `${color} Snowboard`,
          variants: [{ price: Math.random() * 100 }],
        },
      },
    }
  );

  const responseJson = await response.json();

  return json({
    product: responseJson.data.productCreate.product,
  });
}

export default function Index() {
  const { qrCodes } = useLoaderData();
  const navigate = useNavigate();

  return (
    <Page>
      <ui-title-bar title="QR codes">
        <button variant="primary" onClick={() => navigate("/app/qrcodes/new")}>
          Create QR code
        </button>
      </ui-title-bar>
      <Layout>
        <Layout.Section>
          <Card padding="0">
            {qrCodes.length === 0 ? (
              <EmptyQRCodeState onAction={() => navigate("qrcodes/new")} />
            ) : (
              <QRTable qrCodes={qrCodes} />
            )}
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}

// export default function Index() {
//   const nav = useNavigation();
//   const { shop } = useLoaderData();
//   const actionData = useActionData();
//   const submit = useSubmit();

//   const isLoading =
//     ["loading", "submitting"].includes(nav.state) && nav.formMethod === "POST";

//   const productId = actionData?.product?.id.replace(
//     "gid://shopify/Product/",
//     ""
//   );

//   useEffect(() => {
//     if (productId) {
//       shopify.toast.show("Product created");
//     }
//   }, [productId]);

//   const generateProduct = () => submit({}, { replace: true, method: "POST" });

//   return (
//     <Page>
//       <ui-title-bar title="Remix app template">
//         <button variant="primary" onClick={generateProduct}>
//           Generate a product
//         </button>
//       </ui-title-bar>
//       <VerticalStack gap="5">
//         <Layout>
//           <Layout.Section>
//             <Card>
//               <VerticalStack gap="5">
//                 <VerticalStack gap="2">
//                   <Text as="h2" variant="headingMd">
//                     Congrats on creating a new Shopify app 🎉
//                   </Text>
//                   <Text variant="bodyMd" as="p">
//                     This embedded app template uses{" "}
//                     <Link
//                       url="https://shopify.dev/docs/apps/tools/app-bridge"
//                       target="_blank"
//                     >
//                       App Bridge
//                     </Link>{" "}
//                     interface examples like an{" "}
//                     <Link url="/app/additional">
//                       additional page in the app nav
//                     </Link>
//                     , as well as an{" "}
//                     <Link
//                       url="https://shopify.dev/docs/api/admin-graphql"
//                       target="_blank"
//                     >
//                       Admin GraphQL
//                     </Link>{" "}
//                     mutation demo, to provide a starting point for app
//                     development.
//                   </Text>
//                 </VerticalStack>
//                 <VerticalStack gap="2">
//                   <Text as="h3" variant="headingMd">
//                     Get started with products
//                   </Text>
//                   <Text as="p" variant="bodyMd">
//                     Generate a product with GraphQL and get the JSON output for
//                     that product. Learn more about the{" "}
//                     <Link
//                       url="https://shopify.dev/docs/api/admin-graphql/latest/mutations/productCreate"
//                       target="_blank"
//                     >
//                       productCreate
//                     </Link>{" "}
//                     mutation in our API references.
//                   </Text>
//                 </VerticalStack>
//                 <HorizontalStack gap="3" align="end">
//                   {actionData?.product && (
//                     <Button
//                       url={`https://admin.shopify.com/store/${shop}/admin/products/${productId}`}
//                       target="_blank"
//                     >
//                       View product
//                     </Button>
//                   )}
//                   <Button loading={isLoading} primary onClick={generateProduct}>
//                     Generate a product
//                   </Button>
//                 </HorizontalStack>
//                 {actionData?.product && (
//                   <Box
//                     padding="4"
//                     background="bg-subdued"
//                     borderColor="border"
//                     borderWidth="1"
//                     borderRadius="2"
//                     overflowX="scroll"
//                   >
//                     <pre style={{ margin: 0 }}>
//                       <code>{JSON.stringify(actionData.product, null, 2)}</code>
//                     </pre>
//                   </Box>
//                 )}
//               </VerticalStack>
//             </Card>
//           </Layout.Section>
//           <Layout.Section secondary>
//             <VerticalStack gap="5">
//               <Card>
//                 <VerticalStack gap="2">
//                   <Text as="h2" variant="headingMd">
//                     App template specs
//                   </Text>
//                   <VerticalStack gap="2">
//                     <Divider />
//                     <HorizontalStack align="space-between">
//                       <Text as="span" variant="bodyMd">
//                         Framework
//                       </Text>
//                       <Link url="https://remix.run" target="_blank">
//                         Remix
//                       </Link>
//                     </HorizontalStack>
//                     <Divider />
//                     <HorizontalStack align="space-between">
//                       <Text as="span" variant="bodyMd">
//                         Database
//                       </Text>
//                       <Link url="https://www.prisma.io/" target="_blank">
//                         Prisma
//                       </Link>
//                     </HorizontalStack>
//                     <Divider />
//                     <HorizontalStack align="space-between">
//                       <Text as="span" variant="bodyMd">
//                         Interface
//                       </Text>
//                       <span>
//                         <Link url="https://polaris.shopify.com" target="_blank">
//                           Polaris
//                         </Link>
//                         {", "}
//                         <Link
//                           url="https://shopify.dev/docs/apps/tools/app-bridge"
//                           target="_blank"
//                         >
//                           App Bridge
//                         </Link>
//                       </span>
//                     </HorizontalStack>
//                     <Divider />
//                     <HorizontalStack align="space-between">
//                       <Text as="span" variant="bodyMd">
//                         API
//                       </Text>
//                       <Link
//                         url="https://shopify.dev/docs/api/admin-graphql"
//                         target="_blank"
//                       >
//                         GraphQL API
//                       </Link>
//                     </HorizontalStack>
//                   </VerticalStack>
//                 </VerticalStack>
//               </Card>
//               <Card>
//                 <VerticalStack gap="2">
//                   <Text as="h2" variant="headingMd">
//                     Next steps
//                   </Text>
//                   <List spacing="extraTight">
//                     <List.Item>
//                       Build an{" "}
//                       <Link
//                         url="https://shopify.dev/docs/apps/getting-started/build-app-example"
//                         target="_blank"
//                       >
//                         {" "}
//                         example app
//                       </Link>{" "}
//                       to get started
//                     </List.Item>
//                     <List.Item>
//                       Explore Shopify’s API with{" "}
//                       <Link
//                         url="https://shopify.dev/docs/apps/tools/graphiql-admin-api"
//                         target="_blank"
//                       >
//                         GraphiQL
//                       </Link>
//                     </List.Item>
//                   </List>
//                 </VerticalStack>
//               </Card>
//             </VerticalStack>
//           </Layout.Section>
//         </Layout>
//       </VerticalStack>
//     </Page>
//   );
//}
