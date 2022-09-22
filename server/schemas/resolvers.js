const {Book, User, Author} = require('../models');

const resolvers = {
    Query: {
        books: async () => {
            return Book.find({});
        },
        users: async () => {
            return User.find({});
        },
        authors: async () => {
            return Author.find({});
        }
    },  
    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            return user;
        },
        addBook: async (parent, args) => {
            const book = await Book.create(args);
            return book;
        },
        addAuthor: async (parent, args) => {
            const author = await Author.create(args);
            return author;
        }
    }
}
