// // @ts-ignore
// import OpenAI, { API, OpenAIError, ClientOptions } from 'openai';
// import {OpenAIStream, StreamingTextResponse} from 'ai'

// //Create an OpenAI API client - edge friendly
// const openai = new OpenAI({
//     apiKey: process.env.OPENAI_API_KEY,
// });

// //set runtime to edge for best performance

// export const runtime = 'edge';


// export async function POST(request) {

//   try {

//     const {prompt} = await request.json({
//       errors: {
//         400: 'Bad Request',
//         500: 'Internal Server Error',
//         502: 'Bad Gateway',
//         503: 'Service Unavailable',
//         504: 'Gateway Timeout',
//         520: 'Unknown Error',
//         521: 'Web Server Is Down',
//         522: 'Connection Timed Out',
//         523: 'Origin Is Unreachable',
//         524: 'A Timeout Occurred',
//         525: 'SSL Handshake Failed',
//         526: 'Invalid SSL Certificate',
//         527: 'Railgun Error'
//       },
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Accept': 'application/json',
//         'Access-Control-Allow-Origin': '*',
//         'API-KEY':openai,
//     },
//      'prompt': request.params.prompt,
//   });


//   //Ask OpenAI for a streaming completion given the prompt
//   const response = await openai.completions.create({
//     model: "text-davinci-003",
//     stream: true,
//     temperature: 0.6,
//     max_tokens: 150,
//     prompt: `in 50 words create a product description based on their unique features.
//     Product tags: sofa, two seater, red fabric
//     Product description: Indulge in the plush comfort of our stylish two-seater sofa, upholstered in vibrant red fabric. Its compact design makes it a perfect fit for cozy spaces, while the bold hue adds a splash of color. The soft cushions and sturdy frame provide a blend of luxury and lasting support.
//     Product tags: bed, king size, wood frame
//     Product description: Experience royal comfort with our king size bed, featuring a robust wooden frame. Its expansive sleeping surface ensures ample room for a restful night's sleep, while the finely crafted woodwork adds a touch of elegance to your bedroom. The durable frame is designed for longevity, ensuring many nights of serene slumber.
//     Product tags: mirror, green wooden frame
//     Product description: Reflect beauty and elegance with our exquisite mirror encased in a green wooden frame. The unique color adds a dash of whimsy, while the fine craftsmanship showcases a timeless design. Perfect for checking your reflection or simply enhancing your room's aesthetic, this mirror merges functionality with a distinct style that's sure to captivate.
//     Product tags: ${prompt}
//     Product description:`,
//   });

//   //Convert the response into a friendly text-stream
//   const stream = OpenAIStream(response);

//   //Respomd with the stream
//   return new StreamingTextResponse(stream), {
//     Headers: {
//       API: 'OpenAI',
//       'Content-Type': 'text/event-stream',
//       'Cache-Control': 'no-cache',
//       Connection: 'keep-alive',
//       'Access-Control-Allow-Origin': '*',
//       'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
//       'Access-Control-Allow-Headers': 'Content-Type, Authorization',
//       'Access-Control-Allow-Credentials': true,


//     }
//   };

// } catch (error) {
//   //check if error is api error
//   if (error instanceof OpenAIError) {
//     // @ts-ignore
//     const {status, errorResponse, message, headers, name} = error;

//     // @ts-ignore
//     return new Response(error.message, { status: error.statusCode });
//   }
//   return (error && { status: 500 });
// }
// }
