import cloudinary from "@/lib/cloudinary";
import { getServerSession } from "next-auth";
import { Readable } from "stream";
import { authOptions } from "../auth/[...nextauth]/route";

export const runtime = "nodejs";

// Перетворює Buffer у ReadableStream
function bufferToStream(buffer: Buffer) {
  const readable = new Readable();
  readable.push(buffer);
  readable.push(null);
  return readable;
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    // Перевірка ролі
    if (!session?.user || session.user.role !== "admin") {
      return new Response(JSON.stringify({ error: "Доступ заборонено" }), {
        status: 403,
        headers: { "Content-Type": "application/json" },
      });
    }

    const formData = await req.formData();
    const files = formData.getAll("images") as File[];

    if (!files || files.length === 0) {
      return new Response(JSON.stringify({ error: "Файли не надіслані" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const uploadedUrls: string[] = [];

    for (const file of files) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const stream = bufferToStream(buffer);

      const uploaded = await new Promise<any>((resolve, reject) => {
        const cloudStream = cloudinary.uploader.upload_stream(
          {
            folder: "products",
            format: "webp",
          },
          (err, result) => {
            if (err) return reject(err);
            resolve(result);
          }
        );
        stream.pipe(cloudStream);
      });

      uploadedUrls.push(uploaded.secure_url);
    }

    return new Response(JSON.stringify({ urls: uploadedUrls }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Upload error:", err);
    return new Response(JSON.stringify({ error: "Помилка завантаження" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
