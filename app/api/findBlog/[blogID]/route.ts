import { NextResponse } from "next/server";
import BlogPost from "../../../models/BlogPost";
import connectDB from "../../../lib/db";

export async function GET(req: Request, { params }: { params: { blogID: string } }) {

    try {
    const { blogID } = params; // ✅ Correct way to get the ID from the URL path

    if (!blogID) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    // Connect to MongoDB
    await connectDB();

    // Search for the blog post by _id (MongoDB ObjectId)
    const post = await BlogPost.findOne({ _id: blogID });

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
