import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { openEdit } from "../store/editPost";
import EditPost from "./EditPost/EditPost";

export default function BlogPostPage() {
  const [post, setPost] = useState({});
  const isEdit = useSelector((state) => state.edit.progress);
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function editHandler() {
    dispatch(openEdit());
  }

  async function deleteHandler() {
    // eslint-disable-next-line no-restricted-globals
    let confirmed = confirm("Are you sure?");
    if (confirmed) {
      let response = await fetch(`http://localhost:4000/deletePost`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: +params.blogId }),
      });
      if (!response.ok) {
        alert(response.message);
        return;
      }
      navigate("/blogs");
    }
  }

  useEffect(() => {
    const getPostsData = async () => {
      try {
        let response = await fetch(`http://localhost:4000/`);
        if (!response.ok) {
          throw new Error("Failed to fetch posts. Please try again later.");
        }
        let { data } = await response.json();
        if (data) {
          const foundPost = data.find((d) => d.id === +params.blogId);
          if (foundPost) {
            setPost({
              ...foundPost,
              title:
                foundPost.title.charAt(0).toUpperCase() +
                foundPost.title.slice(1),
            });
          } else {
            console.log("file not found");
          }
        }
      } catch (error) {
        console.error("Error fetching blog post:", error);
      }
    };

    getPostsData();
  }, [params.blogId]);

  return (
    <>
      {isEdit === "show" && (
        <EditPost
          id={post.id}
          title={post.title}
          content={post.content}
          imageData={post.imageData}
        />
      )}
      {/* {isEdit === "show" && (
        <EditPost
          id={post.id}
          title={post.title}
          content={post.content}
          imageData={post.imageData}
        />
      )} */}
      {isEdit === "hide" && (
        <Card
          sx={{
            display: "flex",
            flexWrap: "wrap",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div style={{ padding: "1rem" }}>
            {/* <CardMedia
              component="img"
              alt={post.title}
              src={post.imageData}
              title={post.title}
            /> */}
            <div
              style={{
                backgroundImage: `url(${post.imageData})`,
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                height: "100vw",
              }}
            />
            <div>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {post.title}
                </Typography>
              </CardContent>
              <CardContent>
                <Typography gutterBottom variant="p">
                  {post.content}
                </Typography>
              </CardContent>
              <CardActions sx={{ height: 50 }}>
                <Button size="small" onClick={editHandler}>
                  Edit
                </Button>
                <Button size="small" onClick={deleteHandler}>
                  Delete
                </Button>
              </CardActions>
            </div>
          </div>
        </Card>
      )}
    </>
  );
}
