import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import consola from 'consola';
import { ApolloServer } from 'apollo-server-express';
import { resolvers, typeDefs } from './graphql/index';
import mongoose from 'mongoose';
import * as AppModels from './models/index';
import cors from 'cors';

// Initialize the Express Application
const app = express();
app.use(cors());

// Initialize Apollo server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: process.env.IN_PROD,
  context: ({ req }) => {
    return {
      req,
      ...AppModels,
    };
  },
});

const startApp = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECT, {
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

    app.listen(process.env.PORT, () =>
      consola.success({
        badge: true,
        message: `Server running on port ${process.env.PORT}`,
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
