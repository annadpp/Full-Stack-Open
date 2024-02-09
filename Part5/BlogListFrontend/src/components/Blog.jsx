import { useState } from "react";

const Blog = ({ blog, addLikes, deleteBlog, user }) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const handleLike = () => {
    const blogObject = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
    };
    addLikes(blog.id, blogObject);
  };

  const handleDelete = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      deleteBlog(blog.id);
    }
  };

  const showDelete = blog.user.id === user.id ? true : false;

  return (
    <div className="blog">
      <div style={hideWhenVisible} className="hideWhenVisible">
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>view</button>
      </div>
      <div style={showWhenVisible} className="showWhenVisible">
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>hide</button>
        <p>{blog.url}</p>
        <p>
          {blog.likes}
          <button onClick={handleLike}>like</button>
        </p>
        <p>{blog.user !== null && blog.user.username}</p>
        {showDelete && (
          <button onClick={handleDelete} id="remove-button">
            remove
          </button>
        )}
      </div>
    </div>
  );
};

export default Blog;
