require("dotenv").config();
const express = require("express");
const session = require("express-session");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const Database = require("better-sqlite3");
const bcrypt = require("bcrypt");

const db = new Database("db/database.sqlite");

const app = express();

const jwt = require("jsonwebtoken");

app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

let refreshTokens = [];

app.post("/token", (req, res) => {
  const refreshToken = req.body.token;

  if (refreshToken == null) return res.sendStatus(401);
  if (!refreshTokens.includes(refreshToken)) {
    return res.sendStatus(403);
  }
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    const accessToken = generateAccessToken({ name: user.name });
    res.json({ accessToken });
  });
});

app.delete("/logout", (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  //   refreshTokens = refreshTokens.filter((token) => token !== refreshToken);

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
    sameSite: "Strict",
  });

  return res.sendStatus(204);
});

app.post("/login", async (req, res) => {
  const {username, password} = req.body;


  const stmt = db.prepare(`SELECT * FROM users WHERE username = ?`);
  const user = stmt.get(username);

  if(!user) return res.status(401).json({ message: "User does not exist" });

  const isValid = await bcrypt.compare(password, user.passwordHash)

  if (!isValid) return res.status(401).json({message: "Invalid credentials"});


  const payload = {
    username: user.username,
  }

  const accessToken = generateAccessToken(payload);
  const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET);
  refreshTokens.push(refreshToken);
  // Send access and refresh token back to client
  //refresh sent as http-only cookie so js can't read
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });

  res.json({ accessToken: accessToken });
});

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "45s" });
}

app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  if (username === null || email === null || password == null) {
    return res.status(400);
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const stmt = db.prepare(`
    INSERT INTO users (username, email, passwordHash)
    VALUES (?, ?, ?)
  `);

  try {
    stmt.run(username, email, passwordHash);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.status(200).json({ response: "User created successfully!" });
});

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
