import express from 'express';
import consola from 'consola';
import { PORT, IN_PROD, DB_CONNECT } from './config/index';
import { ApolloServer } from 'apollo-server-express';
import { resolvers, typeDefs } from './graphql/index';
import mongoose from 'mongoose';
import * as AppModels from './models/index';
import AuthMiddleware from './middlewares/auth';
import { schemaDirectives } from './graphql/directives';
import cors from 'cors';

// Initialize the Express Application
const app = express();
app.use(AuthMiddleware);
app.use(cors());

// Initialize Apollo server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  schemaDirectives,
  playground: IN_PROD,
  context: ({ req }) => {
    let { isAuth, user } = req;
    return {
      req,
      isAuth,
      user,
      ...AppModels,
    };
  },
});

const startApp = async () => {
  try {
    await mongoose.connect(DB_CONNECT, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: true,
    });
    consola.success({
      badge: true,
      message: 'Successfully connected to database.',
    });
    // Injecting Apollo server middleware into Express Application
    server.applyMiddleware({ app });

    app.listen(PORT, () =>
      consola.success({
        badge: true,
        message: `Server running on port ${PORT}`,
      })
    );
  } catch (err) {
    consola.error({
      badge: true,
      message: err.message,
    });
  }
};

startApp();
