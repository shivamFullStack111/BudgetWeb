const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const { resolver, typedef } = require("./graphqlMain");
const app = express();

app.use(cors());
app.use(express.json());

const connection = async () => {
  // connect to Mongoose
  mongoose
    .connect("mongodb://localhost:27017/budgetTracker")
    .then(() => {
      console.log("connected to mongoose");
    })
    .catch((error) => {
      console.log(error.message);
    });

  const server = new ApolloServer({
    typeDefs: typedef,
    resolvers: resolver,
  });

  await server.start();

  app.use(
    "/graphql",
    expressMiddleware(server, {
      context: ({ req }) => {
        return {
          token: req.headers.authorization,
        };
      },
    })
  );

  app.listen(5000, () => {
    console.log("port listening on http://localhost:5000");
  });
};

connection();
