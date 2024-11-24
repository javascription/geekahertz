import { UTApi } from "uploadthing/server";

const utapi = new UTApi({});

export async function DELETE(req, res) {
  try {
    const data = await req.json();
    console.log(data);
    const newUrl = data.url.substring(data.url.lastIndexOf("/") + 1);
    await utapi.deleteFiles(newUrl);

    return Response.json({ message: "ok" });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "skill issue" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
