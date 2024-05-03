const express = require("express");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();
require("dotenv").config({ path: path.resolve(__dirname, ".env") });
const port = Number(process.argv[2]);

const uri = process.env.MONGO_CONNECTION_STRING;
const db = process.env.MONGO_DB_NAME;
const collection = process.env.MONGO_COLLECTION;
const databaseAndCollection = { db: db, collection: collection };
const { MongoClient, ServerApiVersion } = require("mongodb");
