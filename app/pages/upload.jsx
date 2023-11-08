"use client";

import { useCompletion } from "ai/react";

import { useEffect, useState } from "react";
import { analyzeImage } from "~/models/image-recognition";
import { generateDescription } from "~/models/gpt";
import { authenticate } from "~/shopify.server";
import "./style.css";

export async function action({ request }) {
  const { admin } = await authenticate.admin(request);
  // const response = await admin.graphql(
  //   `#graphql
  //   mutation CreateProductWithNewMedia()`
  // )
}

export default function Upload() {
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");

  async function handleImageUpload(event) {
    const file = event.target.files[0];
    const labels = await analyzeImage(file.path);
    const generatedDescription = await generateDescription(labels);
    setImage(file);
    setDescription(generatedDescription);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("image", image ?? event.target.image.files[0]);
    formData.append("description", description);

    const response = await fetch("/api/generateProduct", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="file"
        name="image"
        accept="image/*"
        required
        onChange={handleImageUpload}
      />
      {description && <p>{description}</p>}

      <button type="submit">Upload</button>
    </form>
  );
}
