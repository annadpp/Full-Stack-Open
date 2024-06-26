import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";

import Notification from "./components/Notification";
import AddBlogForm from "./components/AddBlogForm";
import Togglable from "./components/Togglable";

import blogService from "./services/blogs";
import loginService from "./services/login";
import "./index.css";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [refreshBlog, setRefreshBlog] = useState(false);

  const blogFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      blogs.sort((a, b) => b.likes - a.likes);
      setBlogs(blogs);
    });
  }, [refreshBlog]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBloglistUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedBloglistUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setErrorMessage("Wrong username or password");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleLogout = () => {
    window.localStorage.clear();
    setUser(null);
  };

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility();
    blogService.create(blogObject).then((returnedBlog) => {
      setBlogs(blogs.concat(returnedBlog));
      setSuccessMessage(
        `a new blog ${blogObject.title} by ${blogObject.author} added`
      );
      setRefreshBlog(!refreshBlog);
      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
    });
  };

  const addLikes = async (id, blogObject) => {
    await blogService.update(id, blogObject);
    setRefreshBlog(!refreshBlog);
  };

  const deleteBlog = async (id) => {
    await blogService.remove(id);
    setRefreshBlog(!refreshBlog);
  };

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={errorMessage} />
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              name="Username"
              id="username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="Password"
              id="password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit" id="login-button">
            login
          </button>
        </form>
      </div>
    );
  }
  return (
    <div>
      <h2>blogs</h2>
      <Notification message={errorMessage || successMessage} />

      <div>
        {user.username} logged in
        <button type="submit" onClick={handleLogout}>
          logout
        </button>
      </div>

      <Togglable buttonLabel="new note" ref={blogFormRef}>
        <AddBlogForm createBlog={addBlog} />
      </Togglable>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          addLikes={addLikes}
          deleteBlog={deleteBlog}
          user={user}
        />
      ))}
    </div>
  );
};
export default App;
