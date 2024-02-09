import { useState } from "react";

const AddBlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [likes, setLikes] = useState("");

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value);
  };

  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };

  const addBlog = (event) => {
    event.preventDefault();
    createBlog({
      title: title,
      author: author,
      url: url,
    });
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            type="text"
            value={title}
            name="Title"
            id="title"
            onChange={handleTitleChange}
            placeholder="Title"
          />
        </div>
        <div>
          author:
          <input
            type="text"
            value={author}
            name="Author"
            id="author"
            onChange={handleAuthorChange}
            placeholder="Author"
          />
        </div>
        <div>
          url:
          <input
            type="url"
            value={url}
            name="url"
            id="url"
            onChange={handleUrlChange}
            placeholder="URL"
          />
        </div>

        <button type="submit" id="create-button">
          create
        </button>
      </form>
    </div>
  );
};
export default AddBlogForm;
