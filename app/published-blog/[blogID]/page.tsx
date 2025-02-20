import { notFound } from "next/navigation";

// Dynamic blog post page
export default async function BlogPostPage({ params }: { params: { blogID: string } }) {
  let post = null;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/findBlog/${params.blogID}`);

    if (!res.ok) return notFound(); // Return 404 if fetch fails

    post = await res.json();
    console.log("--------------------------------id", post);
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return notFound(); // Handle errors with 404
  }

  if (!post) return notFound(); // Show 404 page if no post is found

  return (
    <div className="container mx-auto p-8 bg-slate-100 text-black rounded w-3/4">
      <h1 className="text-3xl font-bold">{post.title}</h1>
      <p className="text-sm text-gray-500">
        By {post.author} - {new Date(post.createdAt).toLocaleDateString()}
      </p>
      <div className="mt-4 prose max-w-full" dangerouslySetInnerHTML={{ __html: post.content }} />
    </div>
  );
}
