// "use client";

// import React, { useState } from "react";
// import dynamic from "next/dynamic";
// import "react-quill/dist/quill.snow.css";

// // Dynamically import ReactQuill to avoid SSR issues.
// const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

// const BlogEditor = () => {
//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");

//   // Handler to save the blog post
//   const handleSave = async () => {
//     try {
//       const response = await fetch("/api/blog", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ title, content, author: "Your Author" }),
//       });
//       const data = await response.json();
//       console.log("Blog post saved:", data);
//       // You can also add success notifications or redirect as needed.
//     } catch (error) {
//       console.error("Error saving blog post:", error);
//     }
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Write a New Blog Post</h1>
//       <input
//         type="text"
//         placeholder="Blog Title"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//         className="w-full p-2 border border-gray-300 rounded mb-4"
//       />
//       <ReactQuill
//         theme="snow"
//         value={content}
//         onChange={setContent}
//         className="mb-4"
//       />
//       <button
//         onClick={handleSave}
//         className="px-4 py-2 bg-blue-600 text-white rounded"
//       >
//         Save Blog Post
//       </button>
//     </div>
//   );
// };

// export default BlogEditor;

"use client";

import React, { useState, useCallback, useMemo } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const BlogEditor = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [
          ["bold", "italic", "underline", "strike"],
          [{ "list": "ordered" }, { "list": "bullet" }],
          ["link", "image", "video"],
          ["clean"],
        ],
        handlers: {
          image: () => {
            const input = document.createElement('input');
            input.setAttribute('type', 'file');
            input.setAttribute('accept', 'image/*');
            input.click();

            input.onchange = async () => {
              const file = input.files[0];

              if (/^image\//.test(file.type)) {
                try {
                  const formData = new FormData();
                  formData.append("image", file);

                  const response = await fetch("/api/upload-image", { // Your image upload API route
                    method: "POST",
                    body: formData,
                  });

                  if (!response.ok) {
                    const errorData = await response.json(); // Try to get error details from server
                    throw new Error(errorData.message || "Image upload failed"); // Use server message or default
                  }

                  const { imageUrl } = await response.json();

                  const quill = this.quill; // 'this' is correctly bound now
                  const range = quill.getSelection();
                  quill.insertEmbed(range.index, 'image', imageUrl);
                  quill.setSelection(range.index + 1);

                } catch (error) {
                  console.error('Error uploading image:', error);
                  alert(error.message); // Show error message to user
                }
              } else {
                console.warn('You could only upload images.');
                alert('You could only upload images.'); // Show warning to user
              }
            };
          },
        },
      },
    };
  }, []); // Empty dependency array: modules is only created once

  const handleContentChange = useCallback((value) => {
    setContent(value);
  }, []); // Empty dependency array: function is stable

  const handleSave = async () => {
    try {
      const response = await fetch("/api/blog", { // Your blog post save API route
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content, author: "Your Author" }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to save blog post");
      }

      const data = await response.json();
      console.log("Blog post saved:", data);
      alert("Blog post saved!"); // Success message
      setTitle(""); // Clear the title input
      setContent(""); // Clear the editor content
    } catch (error) {
      console.error("Error saving blog post:", error);
      alert(error.message); // Show error message to user
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Write a New Blog Post</h1>
      <input
        type="text"
        placeholder="Blog Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded mb-4"
      />
      <ReactQuill
        theme="snow"
        value={content}
        onChange={handleContentChange} // Use the useCallback function
        modules={modules} // Use the memoized modules object
        className="mb-4"
      />
      <button
        onClick={handleSave}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Save Blog Post
      </button>
    </div>
  );
};

export default BlogEditor;