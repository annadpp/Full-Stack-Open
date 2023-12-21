const { signToken } = require("../utils/auth");

const Blog = require("../models/blog");
const User = require("../models/user");

const initialBlogs = [
  {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
  },
  {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
  },
  {
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
  },
  {
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
  },
  {
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
  },
];

const baseBlog = {
  author: "Author",
  title: "Title",
  url: "https://mockup/blog",
};

const authHeader = (user) => ({
  Authorization: `Bearer ${signToken(user)}`,
});

const databaseBlogs = async () =>
  (await Blog.find({})).map((blog) => blog.toJSON());

const nonExistingId = async () => {
  const blog = new Blog({
    author: "nonexisting",
    title: "nonexisting",
    url: "http://nonexisting.com",
  });

  await blog.save();
  const deletedBlog = await Blog.findByIdAndRemove(blog._id);

  return deletedBlog ? deletedBlog._id.toString() : null;
};

const baseUser = async () => {
  await User.deleteMany({});
  return await User.create({
    username: "test",
    name: "Test",
    passwordHash: "*******",
  });
};

module.exports = {
  authHeader,
  initialBlogs,
  databaseBlogs,
  baseBlog,
  baseUser,
  nonExistingId,
};
