import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import classes from "./HomePage.module.css";
import { Link } from "react-router-dom";
import Box from "@mui/system/Box";
import FeaturedBlogPosts from "../FeaturedBlogs/FeaturedBlogPosts";

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
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
      <Typography
        variant="h4"
        component="h1"
        mt={4}
        style={{ textAlign: "center", fontWeight: "600" }}
      >
        BLOG
      </Typography>
      <div className={classes.featuredPosts}>
        {isLoading}
        {posts.length === 0 && (
          <p style={{ marginTop: "1rem" }}>No posts found!</p>
        )}
        {posts.length > 0 && (
          <>
            <p>Featured Post</p>
            <Box
              sx={{
                display: "flex",
                gap: "1rem",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: { md: "row", xs: "column" },
                flexWrap: "wrap",
              }}
            >
              <FeaturedBlogPosts posts={posts} />
            </Box>
          </>
        )}
        {posts.length > 0 && (
          <Link to="/blogs" style={{ color: "dodgerblue" }}>
            View more &rsaquo;
          </Link>
        )}
      </div>
    </>
  );
}
