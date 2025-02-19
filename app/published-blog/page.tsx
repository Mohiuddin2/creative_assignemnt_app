// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";

// interface BlogPost {
//   _id: string;
//   title: string;
//   content: string;
//   author: string;
//   createdAt: string;
// }

// const PublishedBlog = () => {
//   const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [currentPage, setCurrentPage] = useState<number>(1);
//   const [totalPages, setTotalPages] = useState<number>(1);

//   const fetchBlogPosts = async (page: number) => {
//     setLoading(true);
//     try {
//       const res = await fetch(`/api/blog?page=${page}&limit=5`);
//       const data = await res.json();
//       setBlogPosts(data.posts);
//       setTotalPages(data.totalPages);
//     } catch (error) {
//       console.error("Error fetching blog posts:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchBlogPosts(currentPage);
//   }, [currentPage]);

//   const handlePageChange = (page: number) => {
//     setCurrentPage(page);
//   };

//   return (
//     <div className="container mx-auto p-4">
//       {/* Header with title and "Write a Blog" button */}
//       <div className="flex flex-col md:flex-row items-center justify-between mb-8">
//         <h1 className="text-4xl font-bold text-center mb-4 md:mb-0">
//           Published Blogs
//         </h1>
//         <Link href="/blog/editor">
//           <button className="btn btn-primary">Write a Blog</button>
//         </Link>
//       </div>

//       {loading ? (
//         <p className="text-center">Loading...</p>
//       ) : (
//         <div className="grid gap-6">
//           {blogPosts.map((post) => (
//             <div key={post._id} className="card bg-base-100 shadow-xl">
//               <div className="card-body">
//                 <h2 className="card-title">{post.title}</h2>
//                 {/* Render the content as HTML. Make sure to sanitize in production. */}
//                 <div
//                   className="prose"
//                   dangerouslySetInnerHTML={{ __html: post.content }}
//                 />
//                 <div className="card-actions justify-between mt-4">
//                   <p className="text-sm text-gray-500">By {post.author}</p>
//                   <p className="text-sm text-gray-500">
//                     {new Date(post.createdAt).toLocaleDateString()}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Pagination Controls */}
//       <div className="flex justify-center mt-8">
//         <ul className="join">
//           {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
//             <li key={page}>
//               <button
//                 onClick={() => handlePageChange(page)}
//                 className={`btn join-item ${
//                   page === currentPage ? "btn-primary" : "btn-outline"
//                 }`}
//               >
//                 {page}
//               </button>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default PublishedBlog;
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface BlogPost {
  _id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
}

const PublishedBlog = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const fetchBlogPosts = async (page: number) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/blog?page=${page}&limit=5`);
      const data = await res.json();
      setBlogPosts(data.posts);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Error fetching blog posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogPosts(currentPage);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="container mx-auto p-4">
      {/* Header with title and "Write a Blog" button */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-8">
        <h1 className="text-4xl font-bold text-center mb-4 md:mb-0">
          Published Blogs
        </h1>
        <Link href="/blog/editor">
          <button className="btn btn-primary">Write a Blog</button>
        </Link>
      </div>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="grid gap-6">
          {blogPosts.map((post) => (
            <div key={post._id} className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">{post.title}</h2>
                {/* The "prose" class from Tailwind Typography styles the content,
                    including images, so they appear nicely. */}
                <div
                  className="prose max-w-full"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
                <div className="card-actions justify-between mt-4">
                  <p className="text-sm text-gray-500">By {post.author}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      <div className="flex justify-center mt-8">
        <ul className="join">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <li key={page}>
              <button
                onClick={() => handlePageChange(page)}
                className={`btn join-item ${
                  page === currentPage ? "btn-primary" : "btn-outline"
                }`}
              >
                {page}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PublishedBlog;

