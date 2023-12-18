const mongoose = require("mongoose");
const supertest = require("supertest");

const app = require("../app");

const Blog = require("../models/blog");
const helper = require("./blog_api_test_helper");

const api = supertest(app);

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
});

afterAll(() => mongoose.connection.close());
