// next js route that uploads an image to google cloud vision and returns descriptive tags

//import { getTags } from '../../lib/cloudvision';
import type { HeadersFunction } from "@remix-run/node";

export const headers: HeadersFunction = ({
  actionHeaders,
  loaderHeaders,
  errorHeaders,
  parentHeaders,
}) => ({
  "Content-Type": "application/json",
  "X-Shopify-Access-Token": `${process.env.SHOPIFY_ACCESS_TOKEN}`
});


export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.Method} Not Allowed`);
  }

  const { imageBase64 } = req.body;

  //check if the image data is provided

  if (!imageBase64) {
    return res.status(400).json({ error: 'No image data provided' });
  }

  try {
    //Authenticate with shopify


    const shopifyResponse = await fetch(`https://oxavions-emporium.myshopify.com/admin/api/2023-10/shop.json`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': process.env.SHOPIFY_ACCESS_TOKEN
      },
    });

    if (!shopifyResponse.ok) {
      throw new Error(`Shopify Authentication Failed: ${shopifyResponse.statusText}`);
    }

    //Parse the Google Cloud credentials JSON from the environment variable
    const googleCredentials = JSON.parse(process.env.CLOUD_VISION_API_KEY);
  }
  const user = auth.currentUser;
  const { url } = req.body;
  const tags = await getTags(url);
  res.status(200).json({ tags });
}

