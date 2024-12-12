const express = require("express");

const cors = require("cors");

const ConnectDB = require("./src/configs/db");

const booksRoute = require("./routes/booksRoute");

const app = express();

const PORT = process.env.PORT;

app.use(express.json());

app.use(cors());

app.get("/", (req, resp) => {
  return resp.status(234).send("Home Page");
});

app.use("/books", booksRoute);

app.listen(PORT, () => {
  ConnectDB();

  console.log(`Connected to the port `, PORT);
});

