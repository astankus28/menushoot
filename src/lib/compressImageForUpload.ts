/**
 * Downscale and re-encode as JPEG so uploads stay under typical serverless limits (~4.5MB on Vercel).
 */
export async function compressImageForUpload(
  file: File,
  options?: { maxEdge?: number; jpegQuality?: number; maxBytesBeforeCompress?: number }
): Promise<File> {
  const maxEdge = options?.maxEdge ?? 2048;
  const jpegQuality = options?.jpegQuality ?? 0.82;
  const maxBytesBeforeCompress = options?.maxBytesBeforeCompress ?? 1.2 * 1024 * 1024;

  if (!file.type.startsWith("image/")) return file;
  const isJpeg = file.type === "image/jpeg" || file.type === "image/jpg";
  if (file.size <= maxBytesBeforeCompress && isJpeg) {
    return file;
  }

  let bitmap: ImageBitmap;
  try {
    bitmap = await createImageBitmap(file);
  } catch {
    return file;
  }

  const { width: iw, height: ih } = bitmap;
  let w = iw;
  let h = ih;
  if (w > maxEdge || h > maxEdge) {
    if (w >= h) {
      h = Math.round((h * maxEdge) / w);
      w = maxEdge;
    } else {
      w = Math.round((w * maxEdge) / h);
      h = maxEdge;
    }
  }

  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    bitmap.close();
    return file;
  }
  ctx.drawImage(bitmap, 0, 0, w, h);
  bitmap.close();

  const blob: Blob | null = await new Promise((resolve) =>
    canvas.toBlob((b) => resolve(b), "image/jpeg", jpegQuality)
  );
  if (!blob || blob.size === 0) return file;

  const base = file.name.replace(/\.[^.]+$/, "") || "photo";
  return new File([blob], `${base}.jpg`, { type: "image/jpeg" });
}
