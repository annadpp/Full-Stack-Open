import { useQuery } from "@apollo/client";
import { useState } from "react";
import { GET_ALL_BOOKS } from "../graphql/queries";

import BooksGenreButtons from "./BooksGenreButtons";
import BooksTable from "./BooksTable";

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
      <BooksTable books={books} loading={loading} />

      <BooksGenreButtons genre={genre} setGenre={setGenre} />
    </div>
  );
};

export default Books;
