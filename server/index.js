const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 3000;
require("dotenv").config();
const morgan = require("morgan");
const cors = require("cors");

const Drink = mongoose.model("drink", {
  name: { type: mongoose.Schema.Types.String, required: true },
  price: { type: mongoose.Schema.Types.String, required: true },
});

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.get("/drinks", async (req, res) => {
  let search = req.query.search;
  if (!search) {
    search = "";
  }
  const drinks = await Drink.find({
    name: { $regex: ".*" + search + ".*", $options: "i" },
  });
  // const drinks = (await Drink.find()).filter((item) => {
  //   return item.name.toLowerCase().includes(search.toLocaleLowerCase());
  // });
  res.send({
    drinks,
  });
});
app.post("/drinks/add", async (req, res) => {
  console.log(req.body);
  const drink = await Drink.create(req.body);
  res.send(drink);
});
// /drinks/delete/id
app.delete("/drinks/delete/:id", async (req, res) => {
  const delDrink = await Drink.deleteOne({
    _id: req.params.id,
  });
  res.send(delDrink);
});

console.log(process.env.DB_URI);
app.listen(port, async () => {
  await mongoose.connect(process.env.DB_URI, {
    user: process.env.DB_USER,
    authSource: "admin",
    pass: process.env.DB_PASSWORD,
  });
  console.log(`Example app listening on port ${port}`);
});
