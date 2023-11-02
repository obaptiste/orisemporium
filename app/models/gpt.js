import OpenAI from 'openai';

const { OPENAI_API_KEY } = process.env;

const openai = new OpenAI({ apiKey:OPENAI_API_KEY });

export async function generateDescription(imageLabels) {
  const gptResponse = await openai.completions.create({
    prompt: `Write a product description for an item with the following features: ${imageLabels}`,
    model: "text-davinci-003",
    max_tokens: 7,
    temperature: 0,
  });
  console.log(gptResponse);
  return gptResponse.choices[0].text.trim();
}
