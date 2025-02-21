import { NextRequest, NextResponse } from "next/server";

import BlogPost from "../../models/BlogPost";
import connectDB from "../../lib/db";


export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const body = rawBody ? JSON.parse(rawBody) : {};

    const { title, content, author } = body;
    if (!title || !content || !author) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    // Connect to the database
    await connectDB();

    // Create and save the new blog post
    const blogPost = new BlogPost({ title, content, author });
    const result = await blogPost.save();

    return NextResponse.json({ message: "Blog post saved successfully", result }, { status: 200 });
  } catch (error:any) {
    console.error("Error saving blog post:", error);
    return NextResponse.json({ message: `Server error: ${error.message}` }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    // Extract pagination query parameters
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "5");

    // Connect to the database
    await connectDB();

    // Count total posts and compute total pages
    const totalPosts = await BlogPost.countDocuments({});
    const totalPages = Math.ceil(totalPosts / limit);

    // Get posts sorted by createdAt (recent first) with pagination
    const posts = await BlogPost.find({})
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    return NextResponse.json({ posts, totalPages });
  } catch (error:any) {
    console.error("Error fetching blog posts:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}