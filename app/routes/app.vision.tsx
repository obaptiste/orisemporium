// next js route that uploads an image to google cloud vision and returns descriptive tags
// import { ImageAnnotatorClient } from '@google-cloud/vision';
import { GoogleAuth } from 'google-auth-library';
import { ImageAnnotatorClient } from '@google-cloud/vision';
import { google } from 'googleapis';

//import { getTags } from '../../lib/cloudvision';
import type { HeadersFunction } from "@remix-run/node";
import fetch from 'isomorphic-fetch';

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
      },
    );

    if (!shopifyResponse.ok) {
      throw new Error(`Shopify Authentication Failed: ${shopifyResponse.statusText}`);
    }

    //Parse the Google Cloud credentials JSON from the environment variable
   // const googleCredentialsJSON = JSON.parse(`${process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON}`);

    // Configure Google Cloud Vision client with credentials
    const auth = new GoogleAuth({
      keyFilename: "../../../googleJSON.json",
       scopes: ['https://www.googleapis.com/auth/cloud-vision'],
    });

    const client = new ImageAnnotatorClient({
      auth: auth,
    });

    const vision = google.vision({
      version: 'v1p2beta1',
      auth: client,
     });


     //Construct the cloud vision api request
     const request = {
      image: {
        content: imageBase64,
      },
      features: [{ type: 'LABEL_DETECTION' }],
    };
    //Call the Google Cloud Vision API
    const result = await vision.images.annotate({ requestBody: { requests: [request] } });

    //Access the data property of the result, not the response object itself
    const annotations = result.data.responses;


    //send the result back to the client
    return res.status(200).json(annotations);
  }
  catch (error) {
    console.error('Vision Api Error:', error);
    return res.status(500).json({ error: 'Error processing vision request' });
  }
}

