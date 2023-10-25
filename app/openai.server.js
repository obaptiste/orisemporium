// import { OpenAI } from "openai";

// //Create an instance of the OpenAi Api
// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// export const handleOpenAICompletion = async (req, res) => {
//   if (!req.session) {
//     res.status(403).send('Unauthorised');
//     return;
//   }

//   const { prompt } = req.body;

//   try {
//     const completion = await openai.completions.create({
//       model: "text-davinci-003",
//       prompt: prompt,
//       max_tokens: 7,
//     });
//     res.status(200).json({ completion: completion.choices[0].text.trim() });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: error });
//   }
// };
