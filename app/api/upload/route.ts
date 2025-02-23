import { NextRequest, NextResponse } from "next/server";
import s3 from "../../lib/s3Config";
import connectDB from "../../lib/db";
import Assignment from "../../models/Assignment";
import { PutObjectCommand } from "@aws-sdk/client-s3";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const formData = await req.formData();
    const title = formData.get("title") as string;
    const subject = formData.get("subject") as string;
    const description = formData.get("description") as string;
    const file = formData.get("file") as Blob;
    const submittedBy = "Mohiuddin";

    if (!title || !subject || !description || !file || !submittedBy) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Convert file to Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Get Original Filename & Extension
    // const fileName = `${Date.now()}-${file.name}`;
    const fileName = `assignments/${Date.now()}-${file.name}`;

    const BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME;
    // Upload to S3
    const uploadParams = {
      Bucket: BUCKET_NAME,
      Key: fileName,
      Body: buffer,
      ContentType: file.type, // Ensure correct MIME type
      ACL: "public-read", // Makes it accessible via a public link
    };

    await s3.send(new PutObjectCommand(uploadParams));

    const fileUrl = `https://${BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
    // const uploadResult = await s3.upload(params).promise();

    // Save to MongoDB
    const newAssignment = new Assignment({
      title,
      subject,
      description,
      fileUrl,
      submittedBy,
    });

    await newAssignment.save();

    return NextResponse.json({ success: true, assignment: newAssignment });
  } catch (error) {
    console.error("S3 Upload Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}



// export async function POST(req: NextRequest) {

//   try {
//     await connectDB();

//     const formData = await req.formData();
//     const title = formData.get("title") as string;
//     const subject = formData.get("subject") as string;
//     const description = formData.get("description") as string;
//     const file = formData.get("file") as Blob;
//     const submittedBy= "Mohiuddin"
//     // const submittedBy= formData.get("submittedBy") as string;

//     if (!title || !subject || !description || !file || !submittedBy) {
//       return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
//     }

//     // Convert file to Buffer
//     const arrayBuffer = await file.arrayBuffer();
//     const buffer = Buffer.from(arrayBuffer);


//     const uploadResult = await new Promise<string>((resolve, reject) => {
//       const uploadStream = cloudinary.uploader.upload_stream(
//         {
//           folder: "assignments",
//           resource_type: "raw",  // Store as raw file
//           use_filename: true,    // Preserve the original file name
//           unique_filename: false // Keep filename unchanged
//         },
//         (error, result) => {
//           if (error) return reject(error);
//           resolve(result?.secure_url || "");
//         }
//       );
//       uploadStream.end(buffer);
//     });
    
//     // Ensure correct download URL
//     const downloadUrl = `${uploadResult.replace('/upload/', '/upload/fl_attachment:')}.xlsx`;
//     console.log("Fixed Download URL: ", downloadUrl);

//     if (!downloadUrl) {
//       return NextResponse.json({ error: "Cloudinary upload failed" }, { status: 500 });
//     }

//     // Save to MongoDB
//     const newAssignment = new Assignment({
//       title,
//       subject,
//       description,
//       fileUrl: downloadUrl,
//       submittedBy
//     });

//     await newAssignment.save();

//     return NextResponse.json({ success: true, assignment: newAssignment });
//   } catch (error) {
//     console.error("Upload error:", error);
//     return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
//   }
// }
