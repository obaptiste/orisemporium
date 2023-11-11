import React from 'react';
import { useFetcher } from '@remix-run/react'
import {debug} from '../utils/debug';




const AnalyseImage = ({imageUrl }) => {// File: /app/components/AnalyzeImage.tsx
  debug();
  let fetcher = useFetcher();

  const handleClick = () => {
    fetcher.load(`/api/analyse-image?imageUrl=${imageUrl}`);
  };

  return (
    <div>
      <button onClick={handleClick}>Analyse Image</button>
      {fetcher.state === "loading" && <p>Loading...</p>}
      {fetcher.state === "submitting" && <p>Submitting...</p>}
      {fetcher.data && <p>Analysis: {fetcher.data}</p>}
    </div>
  )
  };

  export default AnalyseImage;
