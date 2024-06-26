import { useState } from "react";

import { useMutation } from "@apollo/client";
import { ADD_BOOK } from "../graphql/mutations";
import { GET_ALL_AUTHORS, GET_ALL_BOOKS } from "../graphql/queries";

const NewBook = (props) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [published, setPublished] = useState("");
  const [genre, setGenre] = useState("");
  const [genres, setGenres] = useState([]);

  const [addBook] = useMutation(ADD_BOOK);

  if (!props.show) {
    return null;
  }

  const submit = async (event) => {
    event.preventDefault();

    addBook({
      variables: { author, genres, published: +published, title },
      refetchQueries: [
        { query: GET_ALL_AUTHORS },
        { query: GET_ALL_BOOKS },
        ...genres.map((g) => ({
          query: GET_ALL_BOOKS,
          variables: { genre: g },
        })),
      ],
    });

    setTitle("");
    setPublished("");
    setAuthor("");
    setGenres([]);
    setGenre("");
  };

  const addGenre = () => {
    setGenres(genres.concat(genre));
    setGenre("");
  };

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(" ")}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  );
};

export default NewBook;
