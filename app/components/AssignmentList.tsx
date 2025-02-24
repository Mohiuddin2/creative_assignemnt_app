"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { FaDownload } from "react-icons/fa";
import { FcNext} from "react-icons/fc";
import { GrFormPrevious } from "react-icons/gr";
interface Assignment {
  _id: string;
  subject: string;
  title: string;
  submittedBy: string;
  date: string;
  fileUrl: string;
  rating: number;
  ratingsCount: number;
}

const ITEMS_PER_PAGE = 4; // Show 4 assignments per page

export default function AssignmentList() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [hoveredRatings, setHoveredRatings] = useState<Record<string, number | null>>({});
  const [ratedAssignment, setRatedAssignment] = useState<string | null>(null);
  const [ratingValue, setRatingValue] = useState<number | null>(null);
  const [showPopup, setShowPopup] = useState<boolean>(false);

  useEffect(() => {
    axios
      .get<Assignment[]>("/api/assignments")
      .then((res) => {
        const sortedAssignments = res.data.sort(
          (a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
        );
        setAssignments(sortedAssignments);
      })
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

  // Filter assignments based on search input
  const filteredAssignments = assignments
    .filter((assignment) =>
      Object.values(assignment).some((value) =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()); // Ensure sorting after filtering

  // Pagination Logic
  const totalPages = Math.ceil(filteredAssignments.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedAssignments = filteredAssignments.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="flex min-h-screen justify-center p-6">

      <div className="w-full max-w-screen-lg sm:max-w-screen-xl lg:max-w-5xl rounded-2xl bg-base-100 p-4 sm:p-6 md:p-8 shadow-2xl">

<div className="flex flex-col sm:flex-row sm:justify-between mb-1 space-y-2 sm:space-y-0 sm:items-center">
  <h2 className="text-center text-2xl font-bold text-primary">
    📂 Submitted Assignments
  </h2>

          <input
            type="text"
            placeholder="Search by name, title, or date..."
            className="input input-bordered w-full max-w-xs"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {loading ? (
          <p className="text-center text-gray-500">Loading assignments...</p>
        ) : paginatedAssignments.length === 0 ? (
          <p className="text-center text-gray-500">
            No assignments match your search.
          </p>
        ) : (
          <div className="overflow-x-auto">

        
          <table className="min-w-full table-auto mt-6">
            <thead>
              <tr className="bg-teal-500 text-black">
                <th className="border px-4 py-2">#</th>
                <th className="border px-4 py-2">Title</th>
                <th className="border px-4 py-2">Date</th>
                <th className="border px-4 py-2">File</th>
                <th className="border px-4 py-2">Rating</th>
                <th className="border px-4 py-2">By</th>
                <th className="border px-4 py-2">Comment</th>
              </tr>
            </thead>
            <tbody>
              {paginatedAssignments.map((assignment, index) => (
                <tr
                  key={assignment._id}
                  className="hover:bg-dark-100 bg-slate-100 text-black hover:bg-teal-200"
                >
                  <td className="border px-4 py-1">{startIndex + index + 1}</td>
                  
                  <td className="border px-4 py-1">{assignment.title}</td>
                  <td className="border px-4 py-1">
                    {new Date(assignment.submittedAt).toLocaleDateString("en-GB")}
                  </td>
                  <td className="border px-4 py-1">
                    <a
                      href={assignment.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block w-max rounded-lg bg-secondary px-4 py-2 text-black transition hover:bg-secondary-focus"
                    >
                      <FaDownload /> Download
                    </a>
                  </td>
                  <td className="border px-4 py-2">
                  <div className="flex space-x-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <svg
                                key={star}
                                className={`w-6 h-6 cursor-pointer transition-colors ${
                                  (hoveredRatings[assignment._id] !== undefined
                                    ? star <= hoveredRatings[assignment._id]
                                    : star <= assignment.rating)
                                    ? "text-green-500"
                                    : "text-black"
                                } hover:text-green-500`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                                onClick={() => handleRating(assignment._id, star)}
                                onMouseEnter={() => setHoveredRatings((prev) => ({ ...prev, [assignment._id]: star }))}
                                onMouseLeave={() => setHoveredRatings((prev) => ({ ...prev, [assignment._id]: undefined }))}
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
                  <td className="border px-4 py-1">{assignment.submittedBy}</td>
                  <td className="border px-4 py-1">

                  <input
                      type="text"
                      placeholder="Comments"
                       className="input bg-stone-50 border border-gray-400 w-full max-w-xs focus:border-gray-600"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-6 space-x-2">
            <button
              className={`px-4 py-2 rounded-md btn btn-accent text-white ${
                currentPage === 1 ? "cursor-not-allowed" : "bg-primary hover:bg-primary-focus"
              } text-black`}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
             <GrFormPrevious /> Previous
            </button>
            <span className="px-4 py-2 bg-teal-300 text-black rounded-md">
              Page {currentPage} of {totalPages}
            </span>

               <button
                  className={`px-4 py-2 rounded-md btn btn-accent text-white 
                    ${currentPage === totalPages ? "bg-gray-400 cursor-not-allowed opacity-50" : "bg-primary hover:bg-primary-focus"}`}
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
          </div>
        )}

{showPopup && ratedAssignment && (
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-teal-600 p-4 rounded-lg shadow-lg">
            <p className="text-lg text-center text-black p-5">You rated it {ratingValue} {ratingValue === 1 ? "star" : "stars"}! Thank You.</p>
          </div>
        )}
      </div>
    </div>
  );
}
