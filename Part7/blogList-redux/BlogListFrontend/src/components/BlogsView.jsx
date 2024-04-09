import { Link } from "react-router-dom";

const BlogsView = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div style={blogStyle} className="blog">
      <div style={hideWhenVisible} className="whenHidden">
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>view</button>
      </div>
    </div>
  );
};
export default BlogsView;
