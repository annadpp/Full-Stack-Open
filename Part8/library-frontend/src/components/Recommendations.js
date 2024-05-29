import { useQuery } from "@apollo/client";
import { GET_ALL_BOOKS, GET_ME } from "../graphql/queries";
import BooksTable from "./BooksTable";

const Recommendations = (props) => {
  const { data: userData, loading: loadingUser } = useQuery(GET_ME);

  const genre = userData?.me?.favouriteGenre;

  const { data: booksData, loading: loadingBooks } = useQuery(GET_ALL_BOOKS, {
    variables: { genre },
    skip: loadingUser,
  });

  if (!props.show) return null;

  const books = booksData?.allBooks || [];

  return (
    <div>
      <h2>recommendations</h2>
      {genre && (
        <p>
          books in your favourite genre <b>{genre}</b>
        </p>
      )}
      <BooksTable books={books} loading={loadingBooks || loadingUser} />
    </div>
  );
};

export default Recommendations;
