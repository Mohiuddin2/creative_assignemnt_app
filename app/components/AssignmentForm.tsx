"use client";

import { useState } from "react";
import axios from "axios";

export default function AssignmentForm() {
  const [file, setFile] = useState<File | null>(null);
  const [subject, setSubject] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  // const [submittedBy, setSubmittedBy] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    if (!file || !title || !description || !subject) {
      alert("Please fill in all fields and upload a file!");
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("title", title);
      formData.append("subject", subject);
      formData.append("submittedBy", "Mohiuddin");
      formData.append("description", description);

      const res = await axios.post("/api/upload", formData);

      if (res.data.success) {
        alert("Assignment submitted successfully!");
        setTitle("");
        setDescription("");
        setFile(null);
      } else {
        alert("Upload failed. Please try again.");
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Error submitting assignment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary to-secondary p-6">
      <div className="w-full max-w-lg rounded-2xl bg-base-100 p-8 shadow-2xl">
        <h2 className="text-center text-2xl font-bold text-primary">📄 Submit Assignment</h2>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          {/* Title Input */}
          <input
            type="text"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="input input-bordered w-full"
            required
          />
          {/* <input
            type="text"
            placeholder="Subject"
            value={submittedBy}
            // onChange={setSubmittedBy("Mohammed")}
            className="input input-bordered w-full hidden"
            required
          /> */}
          <input
            type="text"
            placeholder="Assignment Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input input-bordered w-full"
            required
          />

          {/* Description Input */}
          <textarea
            placeholder="Assignment Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="textarea textarea-bordered w-full"
            required
          />

          {/* File Upload */}
          <label className="flex cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed p-4 text-primary hover:border-secondary">
            📤 Upload File
            <input type="file" onChange={handleFileChange} className="hidden" />
          </label>

          {/* File Preview */}
          {file && <p className="mt-2 text-sm text-gray-600">📁 {file.name}</p>}

          {/* Submit Button */}
          <button type="submit" disabled={loading} className="btn btn-primary w-full">
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}
