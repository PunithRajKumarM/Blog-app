import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

export default function FeaturedBlogPost({ title, imageData }) {
  let blogTitle = title.charAt(0).toUpperCase() + title.slice(1);

  return (
    <Card
      sx={{
        width: 320,
        height: 250,
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <CardMedia
        sx={{ height: 150 }}
        component="img"
        alt={blogTitle}
        src={imageData}
        title={blogTitle}
      />
      <CardContent sx={{ height: 100 }}>
        <Typography gutterBottom variant="h5" component="div">
          {blogTitle}
        </Typography>
      </CardContent>
      {/* <CardActions sx={{ height: 50 }}>
        <Button size="small">Edit</Button>
        <Button size="small">Delete</Button>
      </CardActions> */}
    </Card>
  );
}
