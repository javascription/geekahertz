import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 4,
    },
  }).onUploadComplete(async ({ file }) => {
    console.log("file url", file.url);
  }),
  pdfUploader: f({
    pdf: {
      maxFileSize: "16MB",
      maxFileCount: 4,
    },
  }).onUploadComplete(async ({ file }) => {
    console.log("file url", file.url);
  }),
  videoUploader: f({
    video: {
      maxFileSize: "16MB",
      maxFileCount: 4,
    },
  }).onUploadComplete(async ({ file }) => {
    console.log("file url", file.url);
  }),
  audioUploader: f({
    audio: {
      maxFileSize: "8MB",
      maxFileCount: 4,
    },
  }).onUploadComplete(async ({ file }) => {
    console.log("file url", file.url);
  }),
  textUploader: f({
    text: {
      maxFileSize: "64KB",
      maxFileCount: 4,
    },
  }).onUploadComplete(async ({ file }) => {
    console.log("file url", file.url);
  }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
