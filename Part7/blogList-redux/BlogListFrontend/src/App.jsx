import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Notification from "./components/Notification";
import AddBlogForm from "./components/AddBlogForm";
import BlogList from "./components/BlogList";
import LoginForm from "./components/LoginForm";
import { initializeBlogs } from "./reducers/blogReducer";
import { initializeUser } from "./reducers/authReducer";
import { initializeAllUsers } from "./reducers/userReducer";
import UserDisplay from "./components/UserDisplay";
import { Nav, Navbar } from "react-bootstrap";
import { logout } from "./reducers/authReducer";
import EachUser from "./components/EachUser";
import EachBlog from "./components/EachBlog";

import { Routes, Route, Link } from "react-router-dom";
import BlogsView from "./components/BlogsView";
import UsersView from "./components/UsersView";

const App = () => {
  const authUsers = useSelector((state) => state.authUser);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(initializeUser());
    dispatch(initializeAllUsers());
  }, [dispatch]);

  const padding = {
    padding: 5,
  };

  const Home = () => {
    return (
      <div>
        <h2>Blogs App</h2>
        <AddBlogForm />
        <BlogList />
      </div>
    );
  };

  const Blogs = () => {
    return (
      <div>
        <h2>Blogs</h2>
        <BlogList />
      </div>
    );
  };

  const handleLogout = async (event) => {
    event.preventDefault();
    dispatch(logout());
  };

  return (
    <div className="container">
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/">
                home
              </Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/blogs">
                blogs
              </Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/users">
                users
              </Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              {authUsers ? (
                <em> {authUsers.name} logged in </em>
              ) : (
                <Link style={padding} to="/login">
                  login
                </Link>
              )}
            </Nav.Link>
            <button type="submit" onClick={handleLogout}>
              logout
            </button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Notification />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={authUsers ? <Home /> : <LoginForm />} />
        <Route path="/users" element={<UsersView />} />
        <Route path="/blogs" element={<BlogsView />} />
        <Route path="/users/:id" element={<User />} />
        <Route path="/blogs/:id" element={<Blog />} />
      </Routes>
    </div>
  );
};
export default App;
