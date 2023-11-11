
import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';

export const runtime = 'edge';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request, imageUrl: string) {
  // Extract the `prompt` from the body of the request
  const { prompt } = await req.json();

  // Request the OpenAI API for the response based on the prompt
  const response = await openai.chat.completions.create({
    model: 'gpt-4-vision-preview',
    stream: true,
    // a precise prompt is important for the AI to reply with the correct tokens
    messages: [
      {
        role: 'user',
        content: `[{ type: "text", text: "What's in this image? ${prompt}" },
        { type: "image_url", image_url: imageUrl },
      {Output:\n}]`,
        //       `Given the following post content, detect if it has typo or not.
        // Respond with a JSON array of typos ["typo1", "typo2", ...] or an empty [] if there's none. Only respond with an array. Post content:


        ///Output:\n`}],
      },
    ],
    max_tokens: 200,
    temperature: 0, // you want absolute certainty for spell check
    top_p: 1,
    frequency_penalty: 1,
    presence_penalty: 1,
  });

  const stream = OpenAIStream(response);

  return new StreamingTextResponse(stream);
}
