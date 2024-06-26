import { useDispatch } from "react-redux";
import { createBlogs } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";
import Togglable from "./Togglable";
import { useRef } from "react";

const AddBlogForm = () => {
  const dispatch = useDispatch();

  const blogFormRef = useRef();

  const addBlog = async (event) => {
    event.preventDefault();

    const title = event.target.titleInput.value;
    const author = event.target.authorInput.value;
    const url = event.target.urlInput.value;

    event.target.titleInput.value = "";
    event.target.authorInput.value = "";
    event.target.urlInput.value = "";

    const createdBlog = {
      title: title,
      author: author,
      url: url,
    };

    dispatch(createBlogs(createdBlog));
    dispatch(setNotification(`a new blog ${title} by ${author} added`, 5));
  };

  return (
    <Togglable buttonLabel="create new blog" ref={blogFormRef}>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input name="titleInput" />
        </div>
        <div>
          author:
          <input name="authorInput" />
        </div>
        <div>
          url:
          <input name="urlInput" />
        </div>
        <button type="submit" id="create-button">
          create
        </button>
      </form>
    </Togglable>
  );
};
export default AddBlogForm;
