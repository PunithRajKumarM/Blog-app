import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Box from "@mui/system/Box";
import classes from "./EditPost.module.css";
import { Link, useNavigate } from "react-router-dom";
import { hideEdit } from "../store/editPost";
import { useDispatch } from "react-redux";

export default function EditPost({ title, content, id, imageData }) {
  const [newTitle, setNewTitle] = useState(title);
  const [newContent, setNewContent] = useState(content);
  const [newImageData, setNewImageData] = useState(imageData);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function submitHandler() {
    if (!title || !content || !imageData) {
      alert("Enter valid data!");
      return;
    }
    await fetch("http://localhost:4000/updatePost", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        title: newTitle,
        content: newContent,
        imageData: newImageData,
      }),
    });
    navigate("/blogs");
    dispatch(hideEdit());
  }

  return (
    <div className={classes.editPostWrapper}>
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
          <Typography variant="h5">Edit Post</Typography>
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
            onChange={(e) => setNewTitle(e.target.value)}
            value={newTitle}
          />
          <TextField
            id="outlined-multiline-static"
            label="Content"
            multiline
            fullWidth
            onChange={(e) => setNewContent(e.target.value)}
            value={newContent}
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
                  setNewImageData(reader.result);
                };

                if (file) {
                  reader.readAsDataURL(file);
                }
              }}
              value={newImageData}
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
        <Divider />
        <CardActions
          sx={{
            display: "flex",
            justifyContent: "space-around",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <Button onClick={submitHandler}>Edit</Button>
          <Link to="..">
            <Button>Cancel</Button>
          </Link>
        </CardActions>
      </Card>
    </div>
  );
}
