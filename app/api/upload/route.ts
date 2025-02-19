import { NextRequest, NextResponse } from "next/server";
import cloudinary from "../../lib/cloudinary";
import connectDB from "../../lib/db";
import Assignment from "../../models/Assignment";


export async function POST(req: NextRequest) {

  try {
    await connectDB();

    const formData = await req.formData();
    const title = formData.get("title") as string;
    const subject = formData.get("subject") as string;
    const description = formData.get("description") as string;
    const file = formData.get("file") as Blob;
    const submittedBy= "Mohiuddin"
    // const submittedBy= formData.get("submittedBy") as string;

    if (!title || !subject || !description || !file || !submittedBy) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Convert file to Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to Cloudinary
    const uploadResult = await new Promise<string>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: "assignments" },
        (error, result) => {
          if (error) reject(error);
          resolve(result?.secure_url || "");
        }
      );
      uploadStream.end(buffer);
    });

    if (!uploadResult) {
      return NextResponse.json({ error: "Cloudinary upload failed" }, { status: 500 });
    }

    // Save to MongoDB
    const newAssignment = new Assignment({
      title,
      subject,
      description,
      fileUrl: uploadResult,
      submittedBy
    });

    await newAssignment.save();

    return NextResponse.json({ success: true, assignment: newAssignment });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
