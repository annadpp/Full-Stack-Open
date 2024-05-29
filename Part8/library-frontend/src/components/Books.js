import { useQuery } from "@apollo/client";
import { useState } from "react";
import { GET_ALL_BOOKS } from "../graphql/queries";
import BooksGenreButtons from "./BooksGenreButtons";

const Books = (props) => {
  const [genre, setGenre] = useState("");

  const { data, loading } = useQuery(GET_ALL_BOOKS, {
    variables: {
      ...(genre && { genre }),
    },
  });

  if (!props.show) return null;

  const books = data?.allBooks || [];

  return (
    <div>
      <h2>books</h2>
      {genre && (
        <p>
          in genre <b>{genre}</b>
        </p>
      )}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {loading && <p>loading books...</p>}
      <BooksGenreButtons genre={genre} setGenre={setGenre} />
    </div>
  );
};

export default Books;
