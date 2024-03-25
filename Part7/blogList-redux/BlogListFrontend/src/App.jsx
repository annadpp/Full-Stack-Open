import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Notification from "./components/Notification";
import AddBlogForm from "./components/AddBlogForm";
import BlogList from "./components/BlogList";
import LoginForm from "./components/LoginForm";
import Togglable from "./components/Togglable";
import UsersView from "./components/UsersView";
import { logout } from "./reducers/authReducer";
import { initializeBlogs } from "./reducers/blogReducer";
import { initializeUser } from "./reducers/authReducer";
import { initializeAllUsers } from "./reducers/userReducer";

const App = () => {
  const authUser = useSelector((state) => state.authUser);

  const blogFormRef = useRef();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(initializeUser());
    dispatch(initializeAllUsers());
  }, [dispatch]);

  if (authUser === null) {
    return <LoginForm />;
  }

  const handleLogout = async (event) => {
    event.preventDefault();
    dispatch(logout());
  };

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <p> {authUser.name} logged in </p>
      <UsersView />
      <button type="submit" onClick={handleLogout}>
        logout
      </button>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <AddBlogForm />
      </Togglable>
      <BlogList />
    </div>
  );
};
export default App;
