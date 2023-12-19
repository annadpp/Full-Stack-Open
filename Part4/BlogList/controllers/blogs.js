const Blog = require("../models/blog");
const User = require("../models/user");
const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

const { JWT_SECRET } = require("../utils/config");

const middleware = require("../utils/middleware");

router.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

router.post("/", middleware.tokenExtractor, async (request, response) => {
  if (!request.authToken) {
    return response.status(401).json({ error: "Token is missing" });
  }

  try {
    const decodedToken = jwt.verify(request.authToken, JWT_SECRET);
    const { title, author, url, likes } = request.body;

    const blog = new Blog({ user: decodedToken.id, title, author, url, likes });
    const user = await User.findById(decodedToken.id);

    if (user === null) {
      return response
        .status(401)
        .json({ error: "Token user authentication not found" });
    }

    const savedBlog = await blog.save();
    user.blogs.push(savedBlog._id);
    await user.save();

    response.status(201).json(savedBlog);
  } catch (error) {
    return response.status(401).json({ error: "Token is not valid" });
  }
});

router.put("/:id", middleware.tokenExtractor, async (request, response) => {
  if (!request.authToken) {
    return response.status(401).json({ error: "Token is missing" });
  }

  try {
    const decodedToken = jwt.verify(request.authToken, JWT_SECRET);
    const { title, author, url, likes } = request.body;

    const blog = await Blog.findByIdAndUpdate(
      request.params.id,
      { title, author, url, likes },
      { new: true, runValidators: true, overwrite: true }
    );

    if (blog === null) return response.status(404).end();
    response.json(blog);
  } catch (error) {
    return response.status(401).json({ error: "Token is not valid" });
  }
});

router.delete("/:id", middleware.tokenExtractor, async (request, response) => {
  if (!request.authToken) {
    return response.status(401).json({ error: "Token is missing" });
  }

  try {
    const decodedToken = jwt.verify(request.authToken, JWT_SECRET);
    await Blog.findByIdAndRemove(request.params.id);
    response.status(204).end();
  } catch (error) {
    return response.status(401).json({ error: "Token is not valid" });
  }
});

module.exports = router;
