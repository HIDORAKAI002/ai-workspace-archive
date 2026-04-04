import BlogPostItemHeaderAuthors from "@theme/BlogPostItem/Header/Authors";
import BlogPostItemHeaderInfo from "@theme/BlogPostItem/Header/Info";
import BlogPostItemHeaderTitle from "@theme/BlogPostItem/Header/Title";
import React from "react";
export default function BlogPostItemHeader() {
  return (
    <header>
      <BlogPostItemHeaderTitle />
      <BlogPostItemHeaderInfo />
      <BlogPostItemHeaderAuthors />
    </header>
  );
}
