import type { NextApiRequest, NextApiResponse } from 'next';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const MAX_FILE_SIZE_BYTES = 8 * 1024 * 1024; // 8MB
const ALLOWED_EXT = new Set(['.jpg', '.jpeg', '.png']);

const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_UPLOAD_PRESET = process.env.CLOUDINARY_UPLOAD_PRESET;

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const chunks: Uint8Array[] = [];
    for await (const chunk of req) {
      chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
    }
    const buffer = Buffer.concat(chunks);

    // This is a simple passthrough when using fetch + FormData on the client:
    // Next already gives us the raw body, so we reconstruct a FormData-like boundary.
    const contentType = req.headers['content-type'] || '';
    if (!contentType.startsWith('multipart/form-data')) {
      return res.status(400).json({ error: 'Invalid upload payload' });
    }

    // Use Web FormData parsing via Request API for correctness
    const fakeRequest = new Request('http://localhost/api/upload', {
      method: 'POST',
      headers: { 'content-type': contentType },
      body: buffer,
    });
    const formData = await fakeRequest.formData();
    const file = formData.get('file') as File | null;

    if (!file || !file.size) {
      return res.status(400).json({ error: 'No file provided' });
    }

    const filename = file.name || 'upload';
    const ext = path.extname(filename).toLowerCase();
    if (!ALLOWED_EXT.has(ext)) {
      return res.status(400).json({ error: 'Only jpg, jpeg, png allowed' });
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      return res.status(400).json({ error: 'File too large (max 8MB)' });
    }

    // If Cloudinary is configured, upload there
    if (CLOUDINARY_CLOUD_NAME && CLOUDINARY_UPLOAD_PRESET) {
      const bytes = Buffer.from(await file.arrayBuffer());
      const base64 = bytes.toString('base64');
      const dataUri = `data:${file.type || 'image/jpeg'};base64,${base64}`;

      const body = new FormData();
      body.append('file', dataUri);
      body.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

      const cloudRes = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        { method: 'POST', body }
      );
      const data = await cloudRes.json();
      if (!cloudRes.ok) {
        return res
          .status(cloudRes.status)
          .json({ error: data?.error?.message || 'Upload failed' });
      }

      return res.status(200).json({ url: data.secure_url });
    }

    // Local fallback (for local dev only; production hosts like Vercel have read-only file systems)
    try {
      const bytes = Buffer.from(await file.arrayBuffer());
      const safeBase =
        filename
          .replace(/\.[^/.]+$/, '')
          .replace(/[^a-zA-Z0-9-_]+/g, '-')
          .slice(0, 40) || 'payment';

      const outDir = path.join(process.cwd(), 'public', 'uploads');
      await mkdir(outDir, { recursive: true });

      const outName = `${Date.now()}-${safeBase}${ext}`;
      const outPath = path.join(outDir, outName);
      await writeFile(outPath, bytes);

      return res.status(200).json({ url: `/uploads/${outName}` });
    } catch (err) {
      console.error('Local upload fallback failed:', err);
      return res
        .status(500)
        .json({ error: 'Upload failed (local storage not available on this host)' });
    }
  } catch (err) {
    console.error('Upload API error:', err);
    return res.status(500).json({ error: 'Upload failed' });
  }
}

