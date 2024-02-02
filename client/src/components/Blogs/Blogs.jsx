import { useEffect, useState } from "react";
import Box from "@mui/system/Box";
import { Link, useNavigate } from "react-router-dom";
import FeaturedBlogPost from "../FeaturedBlog/FeaturedBlog";

export default function BlogPosts() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      async function getPostsData() {
        let response = await fetch(`http://localhost:4000/`);
        if (!response.ok) {
          alert("Failed to fetch posts. Please try again later.");
          return;
        }
        let { data } = await response.json();
        if (data) {
          console.log("data received", data);
          setPosts(data);
        }
      }
      getPostsData();
    } catch (error) {}
  }, []);
  return (
    <>
      {posts.length === 0 && navigate("/")}
      {posts.length > 0 && (
        <Box
          mt={4}
          sx={{
            display: "flex",
            gap: "1rem",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: { md: "row", xs: "column" },
            flexWrap: "wrap",
          }}
        >
          {posts.map((p) => (
            <Link key={p.id} to={`/blogs/${p.id}`}>
              <FeaturedBlogPost title={p.title} imageData={p.imageData} />
            </Link>
          ))}
        </Box>
      )}
    </>
  );
}
