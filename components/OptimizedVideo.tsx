"use client";
import React from "react";

export default function OptimizedVideo({ src }: { src: string }) {
  return (
    <video 
      src={src}
      preload="metadata" 
      controls
      className="w-full h-full object-cover rounded-[2rem]"
      poster="/placeholder-glow.jpg"
    >
      <source src={src} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
}
