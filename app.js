const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const mongoose = require("mongoose");
//use let instead of var as var can be accessed as a global variable
// const arrays can still be used to push items
// const items = ["Exercise", "Code", "Sleep"];
// const workItems = [];

const app = express();
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/todolistDB");

const itemsSchema = {
  name: String,
};

const Item = mongoose.model(
  "Item",
  itemsSchema
);

const item1 = new Item({
  name: "Do yoga",
});

const item2 = new Item({
  name: "Eat Breakfast",
});

const item3 = new Item({
  name: "Code",
});

const defaultItems = [item1,item2,item3];



app.get("/", function (req, res) {
  Item.find({}, function(err, foundItems){

     if(foundItems.length === 0){
           Item.insertMany(defaultItems,function(err){
              if(err){
                 console.log("error");
              } else{
                   console.log("Sucsess");
                }
             });
             //After checking if the array is empty then it adds the
             //items to the array and then redirects to home route
             //that is to app.get() which now goes to the else statement
             res.redirect("/");
     } else{
      res.render("lists", { listTitle: "Today", newListItems: foundItems });
     }  
  });
  
});
app.post("/", function (req, res) {
  const itemName = req.body.newItem;

  const item = new Item({
    name: itemName,
  });

  item.save();

  res.redirect("/");
 
});

app.post("/delete",function(req,res){
  // const checkedItemId = req.body.checkbox;
  // Item.findByIdAndRemove("checkedItemId",function(err){
  //   if(err){
  //     console.log(err);
  //   } else{
  //     console.log("deleted");
  //     res.redirect("/");
  //   }
  // });
  console.log(req.body);
});

app.get("/work", function (req, res) {
  res.render("lists", { listTitle: "Work List", newListItems: workItems });
});

app.listen(3000, function () {
  console.log("Server started");
});
