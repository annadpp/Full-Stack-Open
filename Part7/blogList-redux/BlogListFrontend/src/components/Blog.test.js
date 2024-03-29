import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Blog from "./Blog";

test("before clicking view button, content displayed", () => {
  const blog = {
    title: "Title test",
    author: "Author test",
    url: "http://test.com",
    likes: 666,
    user: {
      id: "test1",
    },
  };
  const user = {
    id: "test1",
  };

  const { container } = render(<Blog blog={blog} user={user} />);

  screen.debug();

  const div = container.querySelector(".hideWhenVisible");

  expect(div).toHaveTextContent("Title test Author test");
});

test("after clicking view button, content displayed", async () => {
  const oneBlog = {
    title: "Title test",
    author: "Author test",
    url: "http://test.com",
    likes: 666,
    user: {
      id: "test1",
    },
  };
  const user = {
    id: "test1",
  };

  const { container } = render(<Blog blog={oneBlog} user={user} />);

  const div = container.querySelector(".showWhenVisible");

  expect(div).toHaveTextContent("http://test.com");
  expect(div).toHaveTextContent("666");
});

test("likes button click twice", async () => {
  const oneBlog = {
    title: "Title test",
    author: "Author test",
    url: "http://test.com",
    likes: 666,
    user: {
      id: "test1",
    },
  };
  const user = {
    id: "test1",
  };

  const mockHandler = jest.fn();

  render(<Blog blog={oneBlog} user={user} addLikes={mockHandler} />);

  const users = userEvent.setup();
  const button = screen.getByText("likes");
  await users.click(button);
  await users.click(button);

  expect(mockHandler.mock.calls).toHaveLength(2);
});
