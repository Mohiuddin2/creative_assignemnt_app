"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Sidebar from "../components/Sidebar";
import { GrUnorderedList } from "react-icons/gr";
import Link from "next/link";
import { TbWriting } from "react-icons/tb";

export interface BlogPost {
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
  const [activePost, setActivePost] = useState<BlogPost | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  const router = useRouter();
  const searchParams = useSearchParams();

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

  useEffect(() => {
    const titleParam = searchParams?.get("title");
    if (titleParam && blogPosts.length > 0) {
      const selectedPost = blogPosts.find((post) => post.title === titleParam);
      setActivePost(selectedPost || blogPosts[0]);
    } else if (blogPosts.length > 0) {
      setActivePost(blogPosts[0]);
    }
  }, [searchParams, blogPosts]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  const handlePostClick = (post: BlogPost) => {
    setActivePost(post);
    router.push(`/published-blog/${post._id}`);
  };

  return (
    <div className="container mx-auto p-4 relative flex">
      {/* Sidebar Component */}
      <Sidebar
        blogPosts={blogPosts}
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        handlePostClick={handlePostClick}
      />

      {/* Overlay to close sidebar when clicking outside (mobile only) */}
      {isSidebarOpen && (
        <div
          className="absolute inset-0 z-30 opacity-25 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Main Content */}
      <div className="flex-1">
        <button
          className="top-7 left-3 md:hidden mb-1 p-2 z-40"
          onClick={toggleSidebar}
        >
          <GrUnorderedList className="text-slate-100 text-5xl" />
        </button>
        <div className="flex flex-col md:flex-row items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-center mb-1 md:mb-0"></h1>
          <Link href="/blog/editor">
            <button className="btn btn-primary">
              Write <TbWriting />
            </button>
          </Link>
        </div>

        {loading ? (
          <div className="text-center mt-4">Loading...</div>
        ) : activePost ? (
          <div className="card bg-slate-50 text-black shadow-xl">
            <div className="card-body">
              {/* <h1 className="card-title">{activePost.title}</h1> */}
              <div
                className="prose max-w-full"
                dangerouslySetInnerHTML={{ __html: activePost.content }}
              />
              <div className="card-actions justify-between mt-4">
                <p className="text-sm text-gray-500">
                  By {activePost.author}
                </p>
                <p className="text-sm text-gray-500">
                  {new Date(activePost.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center mt-4">No active post selected</div>
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
    </div>
  );
};

export default PublishedBlog;
