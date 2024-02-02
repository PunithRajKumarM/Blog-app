import { Link } from "react-router-dom";
import FeaturedBlogPost from "../FeaturedBlog/FeaturedBlog";

export default function FeaturedBlogPosts({ posts }) {
  return (
    <>
      {posts.map((p, i) =>
        i === 0 ? (
          <Link to={`/blogs/${p.id}`}>
            <FeaturedBlogPost
              key={p.id}
              title={p.title}
              content={p.content}
              imageData={p.imageData}
            />
          </Link>
        ) : null
      )}
    </>
  );
}
