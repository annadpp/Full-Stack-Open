import { useQuery } from "@apollo/client";
import { GET_ALL_BOOKS } from "../graphql/queries";

const BooksGenreButtons = ({ genre, setGenre }) => {
  const { data, loading } = useQuery(GET_ALL_BOOKS);

  if (loading) return null;

  const genres = new Set([].concat(...data.allBooks.map((b) => b.genres)));

  return (
    <>
      <button disabled={!genre} onClick={() => setGenre("")}>
        all genres
      </button>
      {[...genres].map((g) => (
        <button key={g} disabled={genre === g} onClick={() => setGenre(g)}>
          {g}
        </button>
      ))}
    </>
  );
};

export default BooksGenreButtons;
