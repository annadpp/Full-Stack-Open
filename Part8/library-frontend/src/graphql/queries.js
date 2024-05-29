import { gql } from "@apollo/client";

export const ALL_AUTHORS = gql`
  query allAuthors {
    allAuthors {
      bookCount
      born
      id
      name
    }
  }
`;

export const ALL_BOOKS = gql`
  query allBooks {
    allBooks {
      author {
        name
      }
      id
      published
      title
    }
  }
`;
