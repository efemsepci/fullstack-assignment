const express = require("express");
const fs = require("fs");
const app = express();

const getData = () => {
  const data = fs.readFileSync("../products.json");
  return JSON.parse(data);
};

//we need only get method
app.get("/products", (req, res) => {
  const products = getData().map((product) => {
    const popScore = product.popularityScore;
    const weight = product.weight;
    const goldPrice = 82.7; //USD
    const price = (popScore + 1) * weight * goldPrice; //price calculation

    return {
      //adding price value to json data
      ...product,
      price: price.toFixed(2),
    };
  });

  res.json(products);
});

app.listen(5000, () => console.log("server started..."));
