// pages/api/analyze-image.js
import OpenAI from "openai";

export default async function handler(req, res) {
  // Only allow POST requests for security reasons.
  if (req.method !== 'POST') {
    return res.status(405).send({ message: 'Only POST requests allowed' });
  }

  try {
    // Initialize the OpenAI instance with your API key.
    // Make sure to use environment variables to keep your keys secure.
    const openai = new OpenAI({apiKey:process.env.OPENAI_API_KEY});

    // Extract the image URL from the request body.
    const { imageUrl } = req.body;

    if (!imageUrl) {
      return res.status(400).send({ message: 'Image URL is required' });
    }

    // Call the OpenAI API with the image URL.
    const response = await openai.chat.completions.create({
      model: "gpt-4-vision-preview",
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: "What’s in this image?" },
            { type: "image_url", image_url: imageUrl },
          ],
        },
      ],
    });

    // Respond with the API response.
    res.status(200).json(response.choices[0]);
  } catch (error) {
    // Handle any errors that occur during the API call.
    console.error('Error calling OpenAI:', error);
    res.status(500).json({ message: 'Error processing image', error });
  }
}
