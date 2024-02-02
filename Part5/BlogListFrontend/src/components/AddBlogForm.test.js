import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import AddBlogForm from "./AddBlogForm";
import userEvent from "@testing-library/user-event";

test("<AddBlogForm /> updates parent state and calls onSubmit", async () => {
  const createBlog = jest.fn();
  const user = userEvent.setup();

  render(<AddBlogForm createBlog={createBlog} />);

  const titleInput = screen.getByPlaceholderText("Title");
  const authorInput = screen.getByPlaceholderText("Author");
  const urlInput = screen.getByPlaceholderText("URL");
  const sendButton = screen.getByText("create");

  await user.type(titleInput, "Title test");
  await user.type(authorInput, "Author");
  await user.type(urlInput, "http://test.com");
  await user.click(sendButton);

  expect(createBlog.mock.calls).toHaveLength(1);
  console.log(createBlog.mock.calls[0][0]);
  expect(createBlog.mock.calls[0][0].title).toBe("title");
  expect(createBlog.mock.calls[0][0].author).toBe("author");
  expect(createBlog.mock.calls[0][0].url).toBe("http://localhost.com");
});
