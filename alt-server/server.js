require("dotenv").config();
const express = require("express");

const jwt = require("jsonwebtoken");

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: false }));





app.get("/", (req, res) => {

  res.send({
    msg: "Hello World!",
    user: {},
  });
});




app.get("/users", authenticateToken, (req, res) => {
  res.status(200).json(users.filter((user) => user.name === req.user.name));
});


function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];
  if (token === null) {
    return res.sendStatus(401);
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      console.log(err);

      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
}

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
