"use client";

import { UploadButton } from "@/lib/uploadthing";
import { X } from "lucide-react";
import Image from "next/image";

import "@uploadthing/react/styles.css";

interface ImageUploadProps {
  onChange: (url?: string) => void;
  value: string;
}

export const ImageUpload = ({ onChange, value }: ImageUploadProps) => {
  if (value) {
    return (
      <div className="relative w-32 h-32">
        <Image fill src={value} alt="Upload" className="border object-cover" />
        <button
          onClick={() => onChange("")}
          className="bg-rose-500 text-white
          absolute top-0 right-0 shadow-sm"
          type="button"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }
  return (
    <div className="flex justify-start">
      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          onChange(res?.[0].url);
        }}
        onUploadError={(error: Error) => {
          alert(`ERROR! ${error.message}`);
        }}
        appearance={{
          allowedContent: { display: "none" },
        }}
      />
    </div>
  );
};
