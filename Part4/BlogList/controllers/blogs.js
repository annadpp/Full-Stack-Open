const Blog = require("../models/blog");
const User = require("../models/user");
const express = require("express");

const router = express.Router();

router.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

router.post("/", async (request, response) => {
  const { title, author, url, likes } = request.body;

  const blog = new Blog({ user: user._id, title, author, url, likes });
  const user = await User.findOne({});

  const savedBlog = await blog.save();
  user.blogs.push(savedBlog._id);
  await user.save();

  response.status(201).json(savedBlog);
});

router.put("/:id", async (request, response) => {
  const { title, author, url, likes } = request.body;

  const blog = await Blog.findByIdAndUpdate(
    request.params.id,
    { title, author, url, likes },
    { new: true, runValidators: true, overwrite: true }
  );

  if (blog === null) return response.status(404).end();
  response.json(blog);
});

router.delete("/:id", async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

module.exports = router;
