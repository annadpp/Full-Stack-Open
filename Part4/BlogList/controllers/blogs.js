const Blog = require("../models/blog");
const middleware = require("../utils/middleware");

const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt"); // Add this line

const router = express.Router();

const getTokenFrom = (request) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    return authorization.substring(7);
  }
  return null;
};

router.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

router.post("/", middleware.userExtractor, async (request, response) => {
  const { title, url } = request.body;

  if (!title || !url) {
    return response.status(400).json({ error: "Title and url are required" });
  }

  const token = getTokenFrom(request);

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET);

    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: "Token missing or invalid" });
    }

    const user = request.authUser;

    const blog = new Blog({
      title,
      url,
      user: user._id,
    });

    const savedBlog = await blog.save();

    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();

    response.status(201).json(savedBlog);
  } catch (error) {
    console.error("Token verification error:", error);
    response
      .status(401)
      .json({ error: "Authentication token is missing or not valid" });
  }
});

router.put("/:id", async (request, response) => {
  const { id } = request.params;
  const updatedBlog = request.body;

  const result = await Blog.findByIdAndUpdate(id, updatedBlog, { new: true });

  if (result) {
    response.json(result);
  } else {
    response.status(404).json({ error: "Blog not found" });
  }
});

router.delete("/:id", async (request, response) => {
  const token = getTokenFrom(request);

  try {
    const authBase = jwt.verify(token, process.env.SECRET);
    const blog = await Blog.findById(request.params.id);

    if (!blog) {
      return response.status(404).json({ error: "Blog not found" });
    }

    if (blog.user._id.toString() !== authBase.id) {
      return response
        .status(403)
        .json({ error: "Blog is not owned by this user" });
    }

    await blog.remove();
    response.status(204).end();
  } catch (error) {
    response
      .status(401)
      .json({ error: "Authentication token is missing or not valid" });
  }
});

module.exports = router;
