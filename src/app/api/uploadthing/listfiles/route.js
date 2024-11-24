import { UTApi } from "uploadthing/server";

const utapi = new UTApi({});

export async function GET(req, res) {
  try {
    const files = await utapi.listFiles();
    return new Response(JSON.stringify(files), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "skill issue" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
