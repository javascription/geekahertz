"use client";

import { UploadDropzone } from "./server/uploadthing";
import Files from "./components/files";

export default function Home() {
  return (
    <>
      <UploadDropzone
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          console.log("Files: ", res);
          alert("Upload Completed");
          window.location.reload();
        }}
        onUploadError={(error) => {
          alert(`ERROR! ${error.message}`);
        }}
      />
      <UploadDropzone
        endpoint="videoUploader"
        onClientUploadComplete={(res) => {
          console.log("Files: ", res);
          alert("Upload Completed");
          window.location.reload();
        }}
        onUploadError={(error) => {
          alert(`ERROR! ${error.message}`);
        }}
      />
      <UploadDropzone
        endpoint="audioUploader"
        onClientUploadComplete={(res) => {
          console.log("Files: ", res);
          alert("Upload Completed");
          window.location.reload();
        }}
        onUploadError={(error) => {
          alert(`ERROR! ${error.message}`);
        }}
      />
      <UploadDropzone
        endpoint="pdfUploader"
        onClientUploadComplete={(res) => {
          console.log("Files: ", res);
          alert("Upload Completed");
          window.location.reload();
        }}
        onUploadError={(error) => {
          alert(`ERROR! ${error.message}`);
        }}
      />
      <UploadDropzone
        endpoint="textUploader"
        onClientUploadComplete={(res) => {
          console.log("Files: ", res);
          alert("Upload Completed");
          window.location.reload();
        }}
        onUploadError={(error) => {
          alert(`ERROR! ${error.message}`);
        }}
      />
      <Files />
    </>
  );
}
