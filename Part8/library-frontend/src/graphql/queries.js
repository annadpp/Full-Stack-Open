import { gql } from "@apollo/client";

export const GET_ALL_AUTHORS = gql`
  query allAuthors {
    allAuthors {
      bookCount
      born
      id
      name
    }
  }
`;

export const GET_ALL_BOOKS = gql`
  query GetAllBooks($genre: String) {
    allBooks(genre: $genre) {
      author {
        name
      }
      genres
      id
      published
      title
    }
  }
`;

export const GET_ME = gql`
  query GetMe {
    me {
      id
      favouriteGenre
    }
  }
`;
