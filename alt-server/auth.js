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

app.post("/refresh", (req, res) => {
  console.log(req.cookies);

  const token = req.cookies.refreshToken; // HTTP-only cookie
  if (!token) return res.status(401).json({ message: "No refresh token" });

  try {
    // Verify the refresh token
    const payload = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

    // Check if token exists in DB and is not expired
    const tokenRow = db
      .prepare("SELECT * FROM refresh_tokens WHERE userId = ? AND token = ?")
      .get(payload.userId, token);

    if (!tokenRow || new Date(tokenRow.expiresAt) < new Date()) {
      return res
        .status(401)
        .json({ message: "Refresh token invalid or expired" });
    }

    const userPayload = {
      userId: payload.userId,
      username: payload.username,
    };
    // Issue new access token
    const accessToken = generateAccessToken(userPayload);

    res.json({ accessToken: accessToken });
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: "Invalid refresh token" });
  }
});

app.delete("/logout", (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  db.prepare("DELETE FROM refresh_tokens WHERE token = ?").run(refreshToken);

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
    sameSite: "Strict",
  });

  return res.sendStatus(204);
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const stmt = db.prepare(`SELECT * FROM users WHERE username = ?`);
  const user = stmt.get(username);

  if (!user) return res.status(401).json({ message: "User does not exist" });

  const isValid = await bcrypt.compare(password, user.passwordHash);

  if (!isValid) return res.status(401).json({ message: "Invalid credentials" });

  const payload = {
    userId: user.id,
    username: user.username,
  };

  const accessToken = generateAccessToken(payload);
  const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET);

  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7); // 7 days
  db.prepare(
    "INSERT INTO refresh_tokens (userId, token, expiresAt) VALUES (?, ?, ?)"
  ).run(user.id, refreshToken, expiresAt.toISOString());

  // Send access and refresh token back to client
  //refresh sent as http-only cookie so js can't read
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true, // localhost
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in ms
  });

  res.json({ accessToken: accessToken });
});

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "10m" });
}

app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  if (username === null || email === null || password == null) {
    return res.status(400);
  }

  const passwordHash = await bcrypt.hash(password, 10);

  try {
    const user = db
      .prepare(
        `
    INSERT INTO users (username, email, passwordHash)
    VALUES (?, ?, ?)
  `
      )
      .run(username, email, passwordHash);

    res.status(200).json({ userId: user.lastInsertRowid });
  } catch (err) {
    res.status(400).json({ message: "Username or email already exists" });
  }
});

app.post("/register/profile", (req, res) => {
  const { userId, displayName, bio, location } = req.body;

  try {
    db.prepare(
      `INSERT INTO user_profiles ( userId, displayName, bio, location)
    VALUES (?, ?, ?, ?)`
    ).run(userId, displayName, bio, location);

    res.status(200).json({ message: "User registration completed!" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
