import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';

// Configure Cloudinary with credentials from environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Handles the POST request for uploading a file to Cloudinary.
 * @param request - The incoming Next.js API request object.
 */
export async function POST(request: Request) {
  // 1. Parse the incoming form data
  const formData = await request.formData();
  const file = formData.get('file') as File | null;

  if (!file) {
    return NextResponse.json({ error: 'No file provided.' }, { status: 400 });
  }

  // 2. Convert the file to a buffer
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // 3. Upload the file to Cloudinary using a stream
  try {
    const response = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          // Optional: specify a folder in Cloudinary
          folder: 'hackpulse_payments',
        },
        (error, result) => {
          if (error) {
            console.error('Cloudinary Upload Error:', error);
            return reject(error);
          }
          resolve(result);
        }
      );

      // Pipe the buffer to the upload stream
      const readableStream = new Readable();
      readableStream._read = () => {}; // _read is required but can be a no-op
      readableStream.push(buffer);
      readableStream.push(null);
      readableStream.pipe(uploadStream);
    });

    // 4. Return the secure URL of the uploaded file
    return NextResponse.json({
      secure_url: (response as any).secure_url,
    });

  } catch (error) {
    console.error('Server-side upload error:', error);
    return NextResponse.json(
      { error: 'Cloudinary upload failed.' },
      { status: 500 }
    );
  }
}
