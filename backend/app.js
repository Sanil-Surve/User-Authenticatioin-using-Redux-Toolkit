const express = require("express");
const bodyparser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();
require("./models/db");
const cors = require("cors");

const User = require("./models/user");
const port = process.env.PORT || 4000;
const app = express();

app.use(express.json());
app.use(bodyparser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.post("/create-user", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const user = await User({
    firstName,
    lastName,
    email,
    password,
  });
  await user.save();
  res.json({ success: true, user });
  console.log(user);
});

app.get("/sign-in", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email, password });

  if (!user)
    return res.json({
      success: false,
      message: "user not found, with the given email!",
    });
});

app.listen(port, () => {
  console.log(`Server listening on port:${port}`);
});
