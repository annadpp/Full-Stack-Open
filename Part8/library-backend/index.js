const { ApolloServer, gql, GraphQLError } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");

const dotenv = require("dotenv");
const mongoose = require("mongoose");
const Author = require("./models/author");
const Book = require("./models/book");

dotenv.config();
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connection to MongoDB:", error.message);
  });

const typeDefs = gql`
  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
  }
  type Book {
    title: String!
    author: Author!
    published: Int!
    id: ID!
    genres: [String!]!
  }
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }
  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author
  }
`;

const resolvers = {
  Query: {
    authorCount: () => Author.collection.countDocuments(),
    allAuthors: async () => Author.find({}),
    bookCount: () => Book.collection.countDocuments(),
    allBooks: async (_root, { author, genre }) => {
      let filter = {};
      if (author) filter.author = await Author.find({ name: author });
      if (genre) filter.genres = genre;
      return Book.find(filter);
    },
  },
  Author: {
    bookCount: async (parent) => Book.countDocuments({ author: parent }),
  },
  Book: {
    author: async (parent) => {
      await parent.populate("author");
      return parent.author;
    },
  },
  Mutation: {
    addBook: async (root, { author: name, genres, published, title }) => {
      let author = await Author.findOne({ name });

      if (!author) {
        author = new Author({ name });
        try {
          await author.save();
        } catch (error) {
          throw new GraphQLError(
            "Author name is too short, must be at least 3 characters long."
          );
        }
      }

      const book = new Book({ author, genres, published, title });
      try {
        await book.save();
      } catch (error) {
        throw new GraphQLError(
          "Book title is too short, must be at least 3 characters long."
        );
      }
      return book;
    },
    editAuthor: async (root, { name, setBornTo }) =>
      Author.findOneAndUpdate({ name }, { born: setBornTo }, { new: true }),
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
