const express = require("express");
const graphqlHttp = require("express-graphql");
const mongoose = require("mongoose");
const app = express();

const graphQlSchema = require("./graphql/schema");
const graphQlResolver = require("./graphql/resolvers");
app.use(express.json());

app.use(
  "/graphql",
  graphqlHttp.graphqlHTTP({
    schema: graphQlSchema,
    rootValue: graphQlResolver,

    graphiql: true,
  })
);

mongoose
  .connect(
    `
mongodb+srv://${process.env.Mongo_User}:${process.env.Mongo_password}@cluster0.hphcj.mongodb.net/${process.env.Mongo_Db}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    app.listen(5000);
  })
  .catch((err) => {
    console.log(err);
  });
