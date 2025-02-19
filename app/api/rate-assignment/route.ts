
import Assignment from "../../models/Assignment";
import connectDB from "../../lib/db";
import { NextRequest, NextResponse } from "next/server"; // Import from next/server

export async function POST(req: NextRequest) {
  try {
    await connectDB(); // Connect to the database

    const data = await req.json(); //This line is the most important one.
    const { assignmentId, rating } = data; // Destructure after successful parsing

    // Validation (Important!)
    if (!assignmentId || typeof rating !== "number") {
      return NextResponse.json({ message: "Invalid input" }, { status: 400 });
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json({ message: "Rating must be between 1 and 5" }, { status: 400 });
    }

    const assignment = await Assignment.findById(assignmentId);
    if (!assignment) {
      return NextResponse.json({ message: "Assignment not found" }, { status: 404 });
    }

    const totalRatings = assignment.rating * assignment.ratingsCount;
    const newRatingsCount = assignment.ratingsCount + 1;
    const newAverageRating = (totalRatings + rating) / newRatingsCount;

    assignment.rating = newAverageRating;
    assignment.ratingsCount = newRatingsCount;
    await assignment.save();

    return NextResponse.json({ message: "Rating updated successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error rating assignment:", error);

    // More informative error response for debugging
    return NextResponse.json({ message: `Server error: ${error.message}` }, { status: 500 });
  }
}