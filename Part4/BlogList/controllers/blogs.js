const Blog = require("../models/blog");
const express = require("express");

const router = express.Router();

router.get("/", async (_request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

router.post("/", (request, response) => {
  const blog = new Blog(request.body);

  blog.save().then((result) => {
    response.status(201).json(result);
  });
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
