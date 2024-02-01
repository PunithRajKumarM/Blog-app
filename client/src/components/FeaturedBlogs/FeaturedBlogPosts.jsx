import FeaturedBlogPost from "../FeaturedBlog/FeaturedBlog";

export default function FeaturedBlogPosts({ posts }) {
  return (
    <>
      {posts.map((p, i) =>
        i === 0 ? (
          <FeaturedBlogPost
            key={p.id}
            title={p.title}
            content={p.content}
            imageData={p.imageData}
          />
        ) : null
      )}
    </>
  );
}
