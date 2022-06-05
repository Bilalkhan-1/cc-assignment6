const express = require("express");
const quadraticEquation = require("./schema.js");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const solve = require("quadratic-equations-solver");
var util = require("util");
var encoder = new util.TextEncoder("utf-8");
const app = express();

app.use(bodyParser.json());
// app.use(
//   bodyParser.urlencoded({
//     extended: true,
//   })
// );
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

app.post("/equationSolver", async (req, res) => {
  let a = req.body.a;
  let b = req.body.b;
  let c = req.body.c;
  let d = b * b - 4 * a * c;
  if (d > 0) {
    root1 = (-b + Math.sqrt(d)) / (2 * a);
    root2 = (-b - Math.sqrt(d)) / (2 * a);
  } else if (d == 0) {
    root1 = root2 = -b / (2 * a);
  } else {
    let real = (-b / (2 * a)).toFixed(2);
    let imaginary = (Math.sqrt(-d) / (2 * a)).toFixed(2);
    root1 = real + " + " + imaginary + "i";
    root2 = real + " - " + imaginary + "i";
  }
  console.log(req.body);
  console.log(a, b, c, root1, root2);

  var obj = new quadraticEquation({
    A: a,
    B: b,
    C: c,
    Root_1: root1,
    Root_2: root2,
  });
  try {
    await obj.save();
    res.send(obj);
  } catch (e) {
    res.send(e.message);
  }
});
app.get("/getData", async (req, res) => {
  try {
    quadraticEquation.find({}, (err, data) => {
      if (err) {
        res({ error: "Could not connect to database." });
      } else {
        res.send(data);
      }
    });
  } catch (e) {
    res.status(500).send({ error: "An error occurred" });
  }
});
const CONNECTION_URL =
  "mongodb+srv://bilalkhan:bilal123@cluster0.bcloh.mongodb.net/?retryWrites=true&w=majority  ";

const PORT = process.env.PORT || 5000;

mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log("server running on port: ", PORT))
  )
  .catch((error) => console.log(error.message));
