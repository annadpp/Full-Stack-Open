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

module.exports = router;
