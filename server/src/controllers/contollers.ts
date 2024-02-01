import { Request, Response } from "express";
import { Blog } from "../entity/Blog";
import dataSource from "../data-source";

const blogRepo = dataSource.getRepository(Blog);

export const getPosts = async (req: Request, res: Response) => {
  try {
    let allPosts = await blogRepo.find();
    let postsWithBase64Images = allPosts.map((post) => ({
      ...post,
      imageData: post.imageData.toString("base64"),
    }));

    res.status(200).send({
      message: "Posts fetched successfully!!!",
      data: postsWithBase64Images,
    });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createPost = async (req: Request, res: Response) => {
  try {
    let newPost = new Blog();
    let { title, content, imageData } = req.body;
    newPost.title = title;
    newPost.content = content;
    newPost.imageData = Buffer.from(imageData, "base64");
    await blogRepo.save([newPost]);
    res
      .status(201)
      .send({ message: "Post created successfully", data: newPost });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updatePost = async (req: Request, res: Response) => {
  try {
    let { id, title, content, imageData } = req.body;
    let updatedPost = await blogRepo.update(id, {
      title: title,
      content: content,
      imageData: Buffer.from(imageData, "base64"),
    });
    res
      .status(200)
      .send({ message: "Post updated successfully!!!", data: updatedPost });
  } catch (error) {
    console.error("Error updating post:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deletePost = async (req: Request, res: Response) => {
  try {
    let { id } = req.body;
    let deletedPost = await blogRepo.delete(id);
    if (deletedPost.affected === 1) {
      res
        .status(200)
        .send({ message: "Post deleted successfully!!!", data: deletedPost });
    } else {
      res.status(404).send({ error: "Post not found!!!" });
    }
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};