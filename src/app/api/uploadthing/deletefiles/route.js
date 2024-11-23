import { UTApi } from "uploadthing/server";

export const utapi = new UTApi({});

export async function DELETE(request) {
  const data = await request.json();
  console.log(data);
  const newUrl = data.url.substring(data.url.lastIndexOf("/") + 1);
  await utapi.deleteFiles(newUrl);

  return Response.json({ message: "ok" });
}
