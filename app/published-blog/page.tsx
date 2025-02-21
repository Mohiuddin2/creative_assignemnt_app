import React, { Suspense } from "react";
import PublishedBlog from "./PublishedBlog";

export default function PublishedBlogPage() {
  return (
    <Suspense fallback={<div>Loading published blog...</div>}>
      <PublishedBlog />
    </Suspense>
  );
}
