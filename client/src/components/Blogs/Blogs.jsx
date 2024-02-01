import { useEffect, useState } from "react";
import BlogPost from "../Blog/Blog";
import Box from "@mui/system/Box";
import { Link, useNavigate } from "react-router-dom";

export default function BlogPosts() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
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
          setIsLoading(true);
          console.log("data received", data);
          setPosts(data);
          setIsLoading(false);
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
              <BlogPost
                id={p.id}
                title={p.title}
                content={p.content}
                imageData={p.imageData}
              />
            </Link>
          ))}
        </Box>
      )}
    </>
  );
}
