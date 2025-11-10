import React from "react";
export default function ContainerLoadingSpinner() {
  return (
    <div className=" w-full min-h-[400px] inset-0 flex items-center justify-center bg-[#40404047]">
      <div className="flex flex-col items-center gap-4">
        <div
          className="w-12 h-12 rounded-full border-4 border-white border-t-transparent animate-spin"
          aria-hidden="true"
        />
        <div className="text-white text-sm">Loading...</div>
      </div>
    </div>
  );
}
