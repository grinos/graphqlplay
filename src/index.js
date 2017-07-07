/*
import express from 'express';
import graphQLHTTP from 'express-graphql';
import DataLoader from 'dataloader';
*/

const express = require("express");
const graphQLHTTP = require("express-graphql");
const DataLoader = require("dataloader");

import schema from "./schema";
//const scheme = require("./schema");

// my express App
const app = express();

// provide the express App with a Schema
app.use(
  graphQLHTTP(res => {
    /*
    const personLoader = new DataLoader(
        keys => Promise.all(keys.map(gerPersonByURL))
    )
    const loader
    */
    //context: {loaders}, //CASHES DATA!!! COOL

    return {
      schema,
      graphiql: true
    };
  })
);

// This is where the express App listens for the schema data
app.listen(5000);
