const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
//use let instead of var as var can be accessed as a global variable
// const arrays can still be used to push items
const items = ["Exercise", "Code", "Sleep"];
const workItems = [];

const app = express();
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.get("/", function (req, res) {
  const day = date.getDate();
  res.render("lists", { listTitle: day, newListItems: items });
});
app.post("/", function (req, res) {
  const item = req.body.newItem;
  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
});

app.get("/work", function (req, res) {
  res.render("lists", { listTitle: "Work List", newListItems: workItems });
});
app.listen(3000, function () {
  console.log("Server started");
});
