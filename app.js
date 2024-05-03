const express = require("express");
const axios = require("axios");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
require("dotenv").config({ path: path.resolve(__dirname, ".env") });
const { MongoClient, ServerApiVersion } = require("mongodb");
const app = express();
const port = 8000;

const API_KEY = process.env.API_KEY;
const uri = process.env.MONGO_CONNECTION_STRING;
const db = process.env.MONGO_DB_NAME;
const collection = process.env.MONGO_COLLECTION;
const databaseAndCollection = { db: db, collection: collection };

app.use(express.static(__dirname + "/public"));

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
let collectionObj;

app.set("views", path.resolve(__dirname, "templates"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (request, response) => {
  response.render("index");
});

app.post("/display", async (request, response) => {
  let city = request.body.name;
  let data;
  try {
    data = await axios
      .get(`http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`)
      .then((response) => response.data);
  } catch (error) {
    console.log(error);
  }
  variables = {
    cityName: data.location.name,
    temp: data.current.temp_f,
    humidity: data.current.humidity,
    precipitation: data.current.precip_in,
  };

  response.render("display", variables);
});

app.get("/history", (request, response) => {
  response.render("history");
});

app.listen(port);
