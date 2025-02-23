"use client";

import { useEffect, useState } from "react";
import axios from "axios";

interface Assignment {
  _id: string;
  subject: string;
  submittedBy: string;
  date: string;
  fileUrl: string;
  rating: number;
  ratingsCount: number;
}

export default function AssignmentList() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [ratedAssignment, setRatedAssignment] = useState<string | null>(null);
  const [ratingValue, setRatingValue] = useState<number | null>(null);
  const [showPopup, setShowPopup] = useState<boolean>(false);

  useEffect(() => {
    axios
      .get<Assignment[]>("/api/assignments")
      .then((res) => setAssignments(res.data))
      .catch((error) => console.error("Failed to fetch assignments:", error))
      .finally(() => setLoading(false));
  }, []);

  const handleRating = async (assignmentId: string, rating: number) => {
    try {
      const response = await fetch("/api/rate-assignment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ assignmentId, rating }),
      });

      console.log("Response--------------------------------", response)

      if (!response.ok) {
        throw new Error("Failed to rate assignment");
      }

      setRatedAssignment(assignmentId);
      setRatingValue(rating);
      setShowPopup(true);

      setAssignments((prevAssignments) =>
        prevAssignments.map((assignment) =>
          assignment._id === assignmentId
            ? {
                ...assignment,
                rating: (assignment.rating * assignment.ratingsCount + rating) / (assignment.ratingsCount + 1),
                ratingsCount: assignment.ratingsCount + 1,
              }
            : assignment
        )
      );
    } catch (error) {
      console.error("Failed to rate assignment:", error);
    }
  };

  useEffect(() => {
    if (showPopup) {
      const timer = setTimeout(() => setShowPopup(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [showPopup]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary to-secondary p-6">
      <div className="w-full max-w-3xl rounded-2xl bg-base-100 p-8 shadow-2xl">
        <h2 className="text-center text-2xl font-bold text-primary">📂 Submitted Assignments</h2>

        {loading ? (
          <p className="text-center text-gray-500">Loading assignments...</p>
        ) : assignments.length === 0 ? (
          <p className="text-center text-gray-500">No assignments submitted yet.</p>
        ) : (
          <table className="min-w-full table-auto mt-6">
            <thead>
              <tr>
                <th className="border px-4 py-2">#</th>
                <th className="border px-4 py-2">Submitted By</th>
                <th className="border px-4 py-2">Subject</th>
                <th className="border px-4 py-2">Date</th>
                <th className="border px-4 py-2">File</th>
                <th className="border px-4 py-2">Rating</th>
              </tr>
            </thead>
            <tbody>
              {assignments.map((assignment, index) => (
                <tr key={assignment._id} className="hover:bg-dark-100  bg-slate-100 text-black">
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">{assignment.submittedBy}</td>
                  <td className="border px-4 py-2">{assignment.subject}</td>
                  <td className="border px-4 py-2">{new Date(assignment.submittedAt).toLocaleDateString('en-GB')}</td>
                  <td className="border px-4 py-2">
                  <a
                      href={assignment.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block w-max rounded-lg bg-secondary px-4 py-2 text-black transition hover:bg-secondary-focus"
                    >
                     ⬇️ Download
                    </a>
                  </td>
                  <td className="border px-4 py-2">
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                          key={star}
                          className={`w-6 h-6 cursor-pointer transition-colors ${star <= assignment.rating ? "text-yellow-500" : "text-black"} hover:text-green-500`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                          onClick={() => handleRating(assignment._id, star)}
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 15l-3.75 2.24 1-4.3L2 7.76l4.6-.38L10 2l2.4 5.38 4.6.38-3.25 5.18 1 4.3L10 15z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ))}
                    </div>
                    <div className="flex">

                    <div className="text-sm text-yellow-600 mt-1">
                      {assignment.rating ? `${assignment.rating.toFixed(1)} Stars-` : "No Rating Yet-"}
                    </div>
                    
                    <div className="text-sm text-gray-500 mt-1 ml-1">
                      {assignment.rating ? `${assignment.ratingsCount} View` : "N/A"}
                    </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {showPopup && ratedAssignment && (
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-slate-400 p-4 rounded-lg shadow-lg">
            <p className="text-lg text-center text-black">You rated it {ratingValue} {ratingValue === 1 ? "star" : "stars"}!</p>
          </div>
        )}
      </div>
    </div>
  );
}
