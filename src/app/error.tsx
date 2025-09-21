"use client";
import React from "react";

export default function error({ error }: { error: Error }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <h1 className="text-2xl font-bold text-red-600">Something went wrong!</h1>
      <p className="text-gray-600">{error.message}</p>
      <button
        className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg"
        onClick={() => window.location.reload()}
      >
        Back to Home Page.
      </button>
    </div>
  );
}
