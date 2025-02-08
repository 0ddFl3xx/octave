"use client";

import React, { useState, useEffect } from "react";
import { average } from "color.js";

interface DominantColorExtractorProps {
  imageUrl: string;
  children: (dominantColor: string | null) => React.ReactNode;
}

const DominantColorExtractor: React.FC<DominantColorExtractorProps> = ({
  imageUrl,
  children,
}) => {
  const [dominantColor, setDominantColor] = useState<string | null>(null);

  useEffect(() => {
    const img = new Image();
    img.src = imageUrl;
    img.onload = async () => {
      try {
        const color = await average(img, { amount: 1 });
        const rgb = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
        setDominantColor(rgb);
      } catch (error) {
        console.error("Error extracting color:", error);
      }
    };
  }, [imageUrl]);

  return <>{children(dominantColor)}</>;
};

export default DominantColorExtractor;
