const fs = require("fs");
const cors = require("cors");
const express = require("express");
const morgan = require("morgan");
const app = express();

app.use(morgan("dev"));

app.use(cors());

const quotes = JSON.parse(fs.readFileSync("./quotes.json", "utf-8"));

app.get("/api/v1/random-quote", (req, res) => {
  const quotesLength = quotes.quotes.length - 1;
  const randomIndex = Math.floor(Math.random() * quotesLength);
  console.log(randomIndex);

  res.status(200).json({
    status: "success",
    author: quotes.quotes[randomIndex].author,
    quote: quotes.quotes[randomIndex].quote,
  });
});

app.all("*splate", (req, res) => {
  res
    .status(400)
    .json({ status: "fail", message: "no such route defined on this server" });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
});
