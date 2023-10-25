"use client";

import { useCompletion } from "ai/react";

export default function ProductDescriptor() {
  const { completion, input, isLoading, handleInputChange, handleSubmit } =
    useCompletion({
      api: "/api/completion",
    });

  return (
    <div className="mx-auto w-full max-w-md py-24 flex flex-col stretch">
      <form action="/api/completion" method="POST" onSubmit={handleSubmit}>
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
  );
}
