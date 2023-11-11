"use client";

import { useCompletion } from "ai/react";
import { useFetcher } from "@remix-run/react";
// import OpenAI from "openai";
// import { Completion } from "~/utils/completions";
import { debug } from "../utils/debug";
import "dotenv/config";
// import { authenticate } from "~/shopify.server";
// import type { LoaderFunction } from "@remix-run/node";

// let loader: LoaderFunction = async ({ request }) => {
//   const { admin, session } = await authenticate.admin(request);
// };
export default function ProductDescriptor() {
  debug();

  const { completion, input, isLoading, handleInputChange, handleSubmit } =
    useCompletion({
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods":
          "GET, POST, PUT, DELETE, PATCH, OPTIONS",
        "Access-Control-Allow-Headers":
          "X-Requested-With, content-type, Authorization",
        "Access-Control-Allow-Credentials": "true",
      },
      api: "/api/completion",
    });

  const fetcher = useFetcher();
  const handleClick = () => {
    fetcher.load(`/api/completion?imageUrl=${input}`);
    console.log(`"input is ${input}"`);
  };

  return (
    <>
      <div className="mx-auto w-full max-w-md py-24 flex flex-col stretch">
        <fetcher.Form
          method="post"
          action={`/api/analyse-image?imageUrl=${input}`}
        >
          <h2>Image Descriptor</h2>
          <p> Enter the url for the image</p>
          <input
            type="text"
            name="imageUrl"
            placeholder="Enter image url"
            required={true}
            onChange={handleInputChange}
            value={input}
          />
          <button onClick={handleClick} type="button">
            Analyse Image
          </button>
          {fetcher.state === "loading" && <p>Loading...</p>}
          {fetcher.state === "submitting" && <p>Submitting...</p>}
          {fetcher.data && <p>Analysis: {fetcher.data}</p>}
        </fetcher.Form>
        <form action="/api/vision" method="POST" onSubmit={handleSubmit}>
          <label>
            Say Something...
            <input
              className="fixed w-full max-w-md bottom-0 border border-gray-300 rounded mb-8 shadow-xl p-2 dark:text-black"
              type="text"
              name="input"
              value={input}
              placeholder="Enter product description"
              onChange={handleInputChange}
            />
          </label>
          <output>Completion result: {completion}</output>
          <button disabled={isLoading} type="submit">
            Send
          </button>
        </form>
        <div className="whitespacße-pre-wrap my-6">
          {completion && completion}
        </div>
      </div>
    </>
  );
}
