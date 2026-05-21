import { apiGet } from "./api";

export type CloudinaryFolder =
  | "ulpgl/articles"
  | "ulpgl/events"
  | "ulpgl/activities"
  | "ulpgl/avatars"
  | "ulpgl/uploads";

export async function uploadToCloudinary(file: File, folder: CloudinaryFolder = "ulpgl/uploads"): Promise<string> {
  // 1. Get a signed payload from our backend
  const sig: any = await apiGet("/cloudinary/signature", { folder });
  if (!sig.cloudName) throw new Error("Cloudinary non configuré");

  // 2. Upload directly to Cloudinary
  const form = new FormData();
  form.append("file", file);
  form.append("api_key", sig.apiKey);
  form.append("timestamp", String(sig.timestamp));
  form.append("signature", sig.signature);
  form.append("folder", sig.folder);

  const res = await fetch(`https://api.cloudinary.com/v1_1/${sig.cloudName}/image/upload`, {
    method: "POST",
    body: form,
  });
  if (!res.ok) {
    const t = await res.text();
    throw new Error("Échec upload: " + t.slice(0, 120));
  }
  const data = await res.json();
  return data.secure_url as string;
}
