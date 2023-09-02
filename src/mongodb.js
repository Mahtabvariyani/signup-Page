let mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/LoginSignupTutorial")
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch(() => {
    console.log("failed to Connect ");
  });

let LogInSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

let collection = new mongoose.model("Collection", LogInSchema);

module.exports = collection;
