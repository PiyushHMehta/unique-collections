import { v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier'; // Import streamifier

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
  const data = await req.formData();

  if (data.get('file')) {
    const file = data.get('file');
    const chunks = [];
    for await (const chunk of file.stream()) {
      chunks.push(chunk);
    }
    const buffer = Buffer.concat(chunks);

    const streamUpload = (buffer) => {
      return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: 'UC-menwear' }, // Optionally specify a folder
          (error, result) => {
            if (result) resolve(result);
            else reject(error);
          }
        );
        streamifier.createReadStream(buffer).pipe(uploadStream); // Use streamifier to convert buffer to stream
      });
    };

    try {
      const result = await streamUpload(buffer);
      return Response.json(result.secure_url); // Return the Cloudinary URL
    } catch (error) {
      return Response.json({ error: error.message });
    }
  }

  return Response.json(true);
}