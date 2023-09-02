let express = require("express");
let app = express();
let port = 3034;
let path = require("path");
let hbs = require("hbs");
let collection = require("./mongodb");


app.use(express.static('public'))

let tempelatePath = path.join(__dirname, "../tempelates");

app.use(express.json());
app.set("view engine", "hbs");
app.set("views", tempelatePath);
app.use(express.urlencoded({ extended: false }));

app.get("/signup", (req, res) => {
  res.render("signup");
});

app.post("/signup", async (req, res) => {
  let data = {
    name: req.body.name,
    password: req.body.password,
  };

  await collection.insertMany([data]);

  res.render("home");
});

app.get("/", (req, res) => {
  res.render("login");
});

app.post("/login", async (req, res) => {
  try {
    let check = await collection.findOne({ name: req.body.name });
    if (check.password === req.body.password) {
      res.render("home");
    } else {
      res.send("wrong pass");
    }
  } catch {
    res.send("Wrong detail");
  }
});

app.listen(port, () => {
  console.log("Connected");
});
