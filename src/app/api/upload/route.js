// import {PutObjectCommand, S3Client} from "@aws-sdk/client-s3";
// import { createEdgeStoreProvider } from '@edgestore/react';
// import uniqid from 'uniqid';

// export async function POST(req) {
//   const data =  await req.formData();
//   if (data.get('file')) {
//     // upload the file
//     const file = data.get('file');

//     const s3Client = new S3Client({
//       region: 'us-east-1',
//       credentials: {
//         accessKeyId: process.env.MY_AWS_ACCESS_KEY,
//         secretAccessKey: process.env.MY_AWS_SECRET_KEY,
//       },
//     });

//     const ext = file.name.split('.').slice(-1)[0];
//     const newFileName = uniqid() + '.' + ext;

//     const chunks = [];
//     for await (const chunk of file.stream()) {
//       chunks.push(chunk);
//     }
//     const buffer = Buffer.concat(chunks);

//     const bucket = 'food-ordering';
//     await s3Client.send(new PutObjectCommand({
//       Bucket: bucket,
//       Key: newFileName,
//       ACL: 'public-read',
//       ContentType: file.type,
//       Body: buffer,
//     }));


//     // const link = 'https://'+bucket+'.s3.amazonaws.com/'+newFileName;
//     // const link = 'https://edgestore.dev/' + newFileName;

//     // return Response.json(link);
//   }
//   return Response.json(true);
// }

import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import uniqid from 'uniqid';

export async function POST(req) {
  const data = await req.formData();
  if (data.get('file')) {
    const file = data.get('file');
    const ext = file.name.split('.').slice(-1)[0];
    const newFileName = uniqid() + '.' + ext;

    const chunks = [];
    for await (const chunk of file.stream()) {
      chunks.push(chunk);
    }
    const buffer = Buffer.concat(chunks);

    // Uploading to ImageBB API
    const formData = new FormData();
    formData.append("image", buffer.toString('base64'));
    
    const imgbbResponse = await fetch(`https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`, {
      method: 'POST',
      body: formData,
    });

    if (!imgbbResponse.ok) {
      throw new Error('Failed to upload image to ImageBB');
    }

    const imgbbData = await imgbbResponse.json();
    const link = imgbbData.data.url;
console.log(link)
    return Response.json(link);
  }

  return Response.json(true);
}
