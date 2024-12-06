
// import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
// import uniqid from 'uniqid';

// export async function POST(req) {
//   const data = await req.formData();
//   if (data.get('file')) {
//     // upload the file
//     const file = data.get('file');

//     const s3Client = new S3Client({
//       region: 'ap-south-1',
//       credentials: {
//         accessKeyId: process.env.MY_AWS_ACCESS_KEY,
//         secretAccessKey: process.env.MY_AWS_SECRET_ACCESS_KEY,
//       },
//     });

//     const ext = file.name.split('.').slice(-1)[0];
//     const newFileName = uniqid() + '.' + ext;

//     const chunks = [];
//     for await (const chunk of file.stream()) {
//       chunks.push(chunk);
//     }
//     const buffer = Buffer.concat(chunks);

//     const bucket = 'pizza-ordering-website';
//     await s3Client.send(new PutObjectCommand({
//       Bucket: bucket,
//       Key: newFileName,
//       ACL: 'public-read',
//       ContentType: file.type,
//       Body: buffer,
//     }));


//     const link = 'https://' + bucket + '.s3.amazonaws.com/' + newFileName;
//     return Response.json(link);
//   }
//   return Response.json(true);
// }


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
          { folder: 'MMM-Bakery' }, // Optionally specify a folder
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
