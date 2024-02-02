import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Box from "@mui/system/Box";
import classes from "./CreatePost.module.css";
import { Link, useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageData, setImageData] = useState(null);
  const [creatingPost, setCreatingPost] = useState(false);

  const navigate = useNavigate();

  async function submitHandler() {
    if (!title || !content || !imageData) {
      alert("Enter valid data!");
      return;
    }
    setCreatingPost(true);
    await fetch("http://localhost:4000/createPost", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, content, imageData }),
    });
    setCreatingPost(false);
    navigate("/blogs");
  }

  return (
    <div className={classes.createPostWrapper}>
      <Card
        variant="outlined"
        sx={{ width: { md: "40%", xs: "50%" }, mt: "5%" }}
      >
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <Typography variant="h5">New Post</Typography>
          <TextField
            autoFocus
            required
            margin="dense"
            id="title"
            name="title"
            label="Title"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            id="outlined-multiline-static"
            label="Content"
            multiline
            fullWidth
            onChange={(e) => setContent(e.target.value)}
            required
          />

          <Button fullWidth variant="outlined">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                const reader = new FileReader();

                reader.onloadend = () => {
                  setImageData(reader.result);
                };

                if (file) {
                  reader.readAsDataURL(file);
                }
              }}
              required
            />
          </Button>

          {!imageData && (
            <Typography
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              No image selected!
            </Typography>
          )}

          {imageData && (
            <Box
              sx={{
                backgroundImage: `url(${imageData})`,
                width: "8rem",
                height: "4rem",
                border: "1px solid black",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></Box>
          )}
        </CardContent>
        {
          <Snackbar
            sx={{ bgcolor: "white", color: "dodgerblue" }}
            open={creatingPost}
            message="Post is creating..."
          ></Snackbar>
        }

        <Divider />
        <CardActions
          sx={{
            display: "flex",
            justifyContent: "space-around",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <Button onClick={submitHandler}>Add</Button>
          <Link to="..">
            <Button>Cancel</Button>
          </Link>
        </CardActions>
      </Card>
    </div>
  );
}
