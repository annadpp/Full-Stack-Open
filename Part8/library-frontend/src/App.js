import { useState } from "react";
import { useApolloClient } from "@apollo/client";

import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import Recommendations from "./components/Recommendations";

const AUTH_TOKEN_LOCAL_STORAGE_KEY = "library-auth-token";

const App = () => {
  const [page, setPage] = useState("authors");
  const [authToken, setAuthToken] = useState(
    localStorage.getItem(AUTH_TOKEN_LOCAL_STORAGE_KEY)
  );
  const client = useApolloClient();
  const handleLogin = (authToken) => {
    localStorage.setItem(AUTH_TOKEN_LOCAL_STORAGE_KEY, authToken);
    setAuthToken(authToken);
    setPage("authors");
  };
  const handleLogout = () => {
    localStorage.removeItem(AUTH_TOKEN_LOCAL_STORAGE_KEY);
    setAuthToken(null);
    client.resetStore();
  };
  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {authToken && (
          <button onClick={() => setPage("recommendations")}>
            recommendations
          </button>
        )}

        {authToken && <button onClick={() => setPage("add")}>add book</button>}
        {!authToken && <button onClick={() => setPage("login")}>login</button>}
        {authToken && <button onClick={() => handleLogout()}>logout</button>}
      </div>

      <Authors show={page === "authors"} authToken={authToken} />

      <Books show={page === "books"} />

      <Recommendations show={page === "recommendations"} />

      <NewBook show={page === "add"} />

      {page === "login" && <LoginForm onLogin={handleLogin} />}
    </div>
  );
};

export default App;
