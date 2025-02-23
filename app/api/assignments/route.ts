import { NextRequest, NextResponse } from "next/server";
import connectDB from "../../lib/db";
import Assignment from "../../models/Assignment";


export async function POST(req: NextRequest) {
  await connectDB();
  const { title, description, fileUrl, submittedBy } = await req.json();

  try {
    const newAssignment = await Assignment.create({ title, description, fileUrl, submittedBy });
    return NextResponse.json({ success: true, assignment: newAssignment });
  } catch (error) {
    return NextResponse.json({ success: false, error: `Error submitting assignment:- ${error}` });
  }
}

export async function GET() {
  await connectDB();
  const assignments = await Assignment.find();
  return NextResponse.json(assignments);
}

