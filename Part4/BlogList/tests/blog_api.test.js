const app = require("../app");

const Blog = require("../models/blog");
const User = require("../models/user");
const helper = require("./blog_api_test_helper");

const supertest = require("supertest");

const api = supertest(app);
const mongoose = require("mongoose");

const userBase = { username: "test", name: "Test", password: "test" };

beforeEach(async () => {
  await Blog.deleteMany({});
  await Promise.all(helper.initialBlogs.map((blog) => new Blog(blog).save()));
});

describe("exercise tests", () => {
  test("format is JSON", () =>
    api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/));
  test("all blogs", async () => {
    const response = await api.get("/api/blogs");
    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });

  test("unique identifier property of the blog posts is named id", async () => {
    const blog = (await api.get("/api/blogs")).body[0];
    expect(blog._id).toBeUndefined();
    expect(blog.id).toBeDefined();
  });
});

describe("create new blog post", () => {
  test("post created successfully", async () => {
    await api
      .post("/api/blogs")
      .send(helper.baseBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);
    const allBlogs = await helper.databaseBlogs();
    expect(allBlogs).toHaveLength(helper.initialBlogs.length + 1);
    expect(allBlogs.map((blog) => blog.title)).toContain(helper.baseBlog.title);
  });

  test("likes is set to 0 by default", async () => {
    const response = await api
      .post("/api/blogs")
      .send(helper.baseBlog)
      .expect(201);

    expect(response.body.likes).toEqual(0);
  });

  test("returns 400 if title and url are missing", async () => {
    const blogWithoutTitleAndUrl = {
      author: "Author",
      likes: 5,
    };

    await api.post("/api/blogs").send(blogWithoutTitleAndUrl).expect(400);
  });
});

describe("delete blog", () => {
  test("post deleted successfully", async () => {
    const id = (await Blog.findOne({})).id;
    await api.delete(`/api/blogs/${id}`).expect(204);
    expect((await helper.databaseBlogs()).map((blog) => blog.id)).not.toContain(
      id
    );
  });
});

describe("update blog", () => {
  test("post updated successfully", async () => {
    const initialBlog = await Blog.findOne({
      title: { $ne: helper.baseBlog.title },
    });

    await api
      .put(`/api/blogs/${initialBlog.id}`)
      .send(helper.baseBlog)
      .expect(200);

    const blog = await Blog.findById(initialBlog.id);

    for (const key of Object.keys(helper.baseBlog))
      expect(blog[key]).toEqual(helper.baseBlog[key]);
  });

  test("if invalid ID, 404", async () =>
    api
      .put(`/api/blogs/${await helper.nonExistingId()}`)
      .send(helper.baseBlog)
      .expect(404));

  test("missing properties, 400", async () => {
    await api.post("/api/users").send({}).expect(400);
  });

  test("username shorter than 3 characters, 400", async () => {
    await api
      .post("/api/users")
      .send({ ...userBase, username: "po" })
      .expect(400);
  });

  test("password shorter than 3 characters, 400", async () => {
    await api
      .post("/api/users")
      .send({ ...userBase, password: "po" })
      .expect(400);
  });

  test("username must be unique when creating a new user", async () => {
    const existingUser = await User.findOne({ username: userBase.username });
    await api.post("/api/users").send(existingUser).expect(400);
  });
});

afterAll(() => mongoose.connection.close());
