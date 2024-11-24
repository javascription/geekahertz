"use client";

import { useState } from "react";
import { UploadDropzone } from "../server/uploadthing";
import Files from "../components/files.js";
import Navbar from "../components/Navbar.jsx";
import { useSession } from "next-auth/react";

export default function Upload() {
  const { data: session } = useSession();
  const [selectedEndpoint, setSelectedEndpoint] = useState("imageUploader");

  const fileTypes = [
    { label: "Image", value: "imageUploader" },
    { label: "Video", value: "videoUploader" },
    { label: "Audio", value: "audioUploader" },
    { label: "PDF", value: "pdfUploader" },
    { label: "Text", value: "textUploader" },
  ];

  return (
    <>
      {session ? (
        <>
          <Navbar />
          <div className="absolute inset-0 flex flex-col items-center justify-center mt-8 space-y-6">
            <div>
              <label htmlFor="fileType" className="block text-lg font-medium">
                Select File Type:
              </label>
              <select
                id="fileType"
                className="mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={selectedEndpoint}
                onChange={(e) => setSelectedEndpoint(e.target.value)}
              >
                {fileTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="Drop">
              <UploadDropzone
                endpoint={selectedEndpoint}
                onBeforeUploadBegin={(files) => {
                  return files.map(
                    (file) =>
                      new File([file], `${session.user.id}-${file.name}`, {
                        type: file.type,
                      })
                  );
                }}
                onClientUploadComplete={(res) => {
                  console.log("Files: ", res);
                  alert("Upload Completed");
                  window.location.reload();
                }}
                onUploadError={(error) => {
                  alert(`ERROR! ${error.message}`);
                }}
              />
            </div>
            <Files />
          </div>
        </>
      ) : (
        <>
          <Navbar />
          <section>
            <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
              <h2 className="mb-4 text-4xl tracking-tight font-extrabold">
                Dashboard
              </h2>
              <p className="text-left">
                You need to be logged in to view the Dashboard. Please log in to
                access this page.
              </p>
            </div>
          </section>
        </>
      )}
    </>
  );
}
