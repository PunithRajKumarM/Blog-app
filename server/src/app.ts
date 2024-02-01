import dataSource from "./data-source";
import express = require("express");
import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
} from "./controllers/contollers";

const app = express();
const PORT = 4000;

app.use((_, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  next();
});

app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ extended: true }));

(async () => {
  try {
    await dataSource.initialize();
    console.log("Database connected!!");
    app.listen(PORT, () => {
      console.log(`Server listening in PORT ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect to the database", error);
  }
})();

app.get("/", getPosts);

app.post("/createPost", createPost);

app.put("/updatePost", updatePost);

app.delete("/deletePost", deletePost);
