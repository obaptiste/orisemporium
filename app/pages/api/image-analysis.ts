// // File: /pages/api/image-analysis.js

// import OpenAI from 'openai';
// import type { NextApiRequest, NextApiResponse } from



// const openai = new OpenAI();

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === 'POST') {
//     try {
//       const imageUrl = req.body.imageUrl; // Assume the image URL is sent in the request body
//       const response = await openai.chat.completions.create({
//         model: "gpt-4-vision-preview",
//         messages: [
//           {
//             role: "user",
//             content: JSON.stringify([
//               { type: "text", text: "What’s in this image?" },
//               { type: "image_url", image_url: imageUrl },
//             ]),
//           },
//         ],
//       });

//       // Send back the response to the client
//       res.status(200).json(response.choices[0]);
//     } catch (error) {
//       console.error('Error:', error);
//       res.status(500).json({ error: 'Error processing the image analysis request' });
//     }
//   } else {
//     // Handle any other HTTP methods
//     res.setHeader('Allow', ['POST']);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }
