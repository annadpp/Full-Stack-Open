import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import Blog from "./Blog";

test("renders content", () => {
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
