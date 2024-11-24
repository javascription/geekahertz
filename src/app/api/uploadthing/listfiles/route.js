import { UTApi } from "uploadthing/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../../lib/auth";

const utapi = new UTApi({});

export async function GET(req, res) {
  const session = await getServerSession(authOptions);

  const userId = session.user.id;
  try {
    const files = await utapi.listFiles();
    const files1 = JSON.stringify(files);
    const filteredFiles = files.files.filter((file) =>
      file.name.startsWith(userId)
    );
    return new Response(JSON.stringify({ files: filteredFiles }), {
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
