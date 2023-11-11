// File: /app/routes/api/analyze-image.tsx

import { json} from '@remix-run/node'; // or cloudflare/deno, etc.
import type { ActionFunction } from '@remix-run/node'; // or cloudflare/deno, etc.
import {OpenAI} from "openai";
import { Completion } from '~/utils/completions';

if (!process.env.NEXT_PUBLIC_OPENAI_API_KEY) {
  throw new Error("The OPENAI_API_KEY environment variable is not set.");
}

export const action: ActionFunction = async ({ request }) => {
  if (request.method !== 'POST') {
    return json({ error: 'Method not allowed' }, { status: 405 });
  }

  const formData = await request.formData();
  //const { imageBase64 } = request.body;
  const imageUrl = formData.get('imageUrl');

  if (typeof imageUrl !== 'string') {
    return json({ error: 'Invalid image URL' }, { status: 400 });
  }

  const response = await fetchChatResponse(imageUrl);
  console.log(response);
  return response;
}

  /*
@@imageUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Gfp-wisconsin-madison-the-nature-boardwalk.jpg/2560px-Gfp-wisconsin-madison-the-nature-boardwalk.jpg"
  @@response = fetchChatResponse(@@url)

  */
 export async function fetchChatResponse(imageUrl: string) {
  try {
   const completions = new Completion();
   const CompletionParams = {
     model: "gpt-4-vision-preview",
     prompt:[
       {
         role: "user",
         content: ([
           { type: "text", text: "What’s in this image?"},
           {
           type: "image_url",
           image_url: imageUrl
         },
     ]),

   }
  ]
}
completions.create(CompletionParams!).then(result => {
  console.log(result);
})


      // Send back the response to the client
    } catch (error) {
      //return json(response.choices[0].text);
      console.error('Error:', error);
      return json({ error: 'Error processing the image analysis request' }, { status: 500 });
    }
    fetchChatResponse(imageUrl);
   };


