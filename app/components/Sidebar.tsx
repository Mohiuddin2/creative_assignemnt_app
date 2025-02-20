"use client";

import Link from "next/link";
import { BlogPost } from "./types"; // Or import your BlogPost type from wherever it's defined

interface SidebarProps {
  blogPosts: BlogPost[];
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  handlePostClick: (post: BlogPost) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  blogPosts,
  isSidebarOpen,
  toggleSidebar,
  handlePostClick,
}) => {

  console.log("Blog Post--", blogPosts)
  return (
    <div
      className={`fixed left-0 top-50 w-64 bg-base-100 shadow-xl z-40 transform transition-transform 
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        md:static md:w-1/4 md:block md:translate-x-0`}
    >
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Blog List</h2>
        <ul className="space-y-2">
          {blogPosts.map((post) => (
            <Link key={post._id} href={`/published-blog/${post._id}`} legacyBehavior>
              <li
                className="cursor-pointer hover:text-blue-500"
                onClick={() => {
                  handlePostClick(post);
                  toggleSidebar();
                }}
              >
                {post.title}
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
