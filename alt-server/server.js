require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const Database = require("better-sqlite3");
const bcrypt = require("bcrypt");

const db = new Database("db/database.sqlite");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send({
    msg: "Hello World!",
    user: {},
  });
});

app.get("/user", authenticateToken, (req, res) => {
  try {
    const stmt = db.prepare("SELECT * FROM users WHERE username = ?");
    const user = stmt.get(req.user.username); // returns one row (object) or undefined
    return res.status(200).json({
      username: user.username,
      email: user.email,
      createdAt: user.createdAt,
    });
  } catch (error) {
    return res.status(403).json({ message: error.message });
  }
});

app.get("/users/all", authenticateToken, (req, res) => {
  try {
    const getUsers = db.prepare("SELECT * FROM users").all();
    return res.status(200).json(getUsers);
  } catch (error) {
    return res.status(403).json({ message: error.message });
  }
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
    console.log("User: ", req.user);

    next();
  });
}

app.get("/friends", authenticateToken, (req, res) => {
  const userId = req.user.userId;
  console.log(userId);
  console.log(req);
  

  try {
    const getFriends = db.prepare(`
  SELECT u.id, u.username, u.createdAt
  FROM users u
  JOIN friendships f
    ON (
      (f.requester_id = u.id AND f.addressee_id = ?)
      OR
      (f.addressee_id = u.id AND f.requester_id = ?)
    )
  WHERE f.status = 'accepted'
`);

    const friends = getFriends.all(userId, userId);


    console.log("Friends: ", friends);

    res.status(200).json(friends);
  } catch (error) {
    console.log(error.message);

    res.status(400).json({ message: error.message });
  }
});

app.post("/request", authenticateToken, (req, res) => {
  console.log(req.user);

  const requesterId = req.user.userId;


  console.log(req.body);
  
  

  const addresseeId = req.body.addresseeId;
  try {
    const sendFriendReq = db
      .prepare(
        `INSERT INTO friendships (requester_id, addressee_id, status)
VALUES (?, ?, ?)`
      )
      .run(requesterId, addresseeId, "pending");

    res.status(200).json({ message: "Friend request sent!" });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
});

app.post("/accept", authenticateToken, (req, res) => {
  const addresseeId = req.user.userId;

  const requesterId = req.body.requesterId;

  try {
      const acceptFriendReq = db
        .prepare(
          `UPDATE friendships
        SET status = 'accepted'
        WHERE requester_id = ? AND addressee_id = ?;
`
        )
        .run(requesterId, addresseeId);
    res.status(200).json(acceptFriendReq);
    
  } catch ({message}) {
        console.log(message);
        res.status(400).json({ message: message });
  }


});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
