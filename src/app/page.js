"use server";
import { utapi } from "../app/server/uploadthing";
import Files from "./components/files";

async function uploadFiles(formData) {
  "use server";

  const files = formData.getAll("files");
  const response = await utapi.uploadFiles(files);
}

async function getFiles() {
  const res = await utapi.listFiles();
  return res;
}

export default async function Home() {
  const data = await getFiles();
  const data1 = JSON.parse(JSON.stringify(data));
  return (
    <>
      <form action={uploadFiles}>
        <input name="files" type="file" multiple />
        <button type="submit">Upload</button>
      </form>
      <div>
        <Files data={data1} />
      </div>
    </>
  );
}
