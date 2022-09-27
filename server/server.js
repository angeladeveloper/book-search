const express = require('express');
const path = require('path');
const routes = require('./routes');
const { ApolloServer } = require('apollo-server-express');

const db = require('./config/connection');

//TODO: CREATE typeDefs and resolvers
// const { typeDefs, resolvers } = require('./schemas');
//TODO: hook up auth
const { authMiddleware } = require('./utils/auth');

const app = express();
const PORT = process.env.PORT || 3001;

const apolloServer = new ApolloServer({
  // typeDefs,
  // resolvers,
  context: authMiddleware,
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(
      `🔗Use GraphQL at http://localhost:${PORT}${apolloServer.graphqlPath}`
    )
    console.log(`🌍 Now listening on localhost:${PORT}`);
  });
});
