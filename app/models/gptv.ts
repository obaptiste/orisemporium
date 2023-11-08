import OpenAI from "openai";

// Assuming that the OpenAI library has TypeScript definitions,
// otherwise, you would need to declare them.

// Create a new instance of OpenAI.
const openai = new OpenAI();

async function main(): Promise<void> {
  // Make sure to handle exceptions with a try/catch block.
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4-vision-preview",
      messages: [
        {
          role: "user",
          content: JSON.stringify([
            { type: "text", text: "What's in this image?" },
            {
              type: "image_url",
              image_url:
                "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Gfp-wisconsin-madison-the-nature-boardwalk.jpg/2560px-Gfp-wisconsin-madison-the-nature-boardwalk.jpg",
            } ?? "",
          ]),
        },
      ],
    });

    console.log(response.choices[0]);
  } catch (error) {
    console.error('Error:', error);
  }
}

main();
