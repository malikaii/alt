require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const Database = require("better-sqlite3");
const bcrypt = require("bcrypt");
const http = require("http");
const { Server } = require("socket.io");
const { uploadProfilePhoto } = require("./middleware/uploadProfilePhoto");


const db = new Database("db/database.sqlite");

const app = express();

app.use("/uploads", express.static("uploads"));


const server = http.createServer(app);

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
      userId: user.id,
      username: user.username,
      email: user.email,
      createdAt: user.createdAt,
    });
  } catch (error) {
    return res.status(403).json({ message: error.message });
  }
});

app.get("/user/profile", authenticateToken, (req, res) => {
  try {
    const stmt = db.prepare("SELECT * FROM user_profiles WHERE userId = ?");
    const user = stmt.get(req.user.userId); // returns one row (object) or undefined

    return res.status(200).json(user);
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

    fireNotif();

    res.status(200).json(friends);
  } catch (error) {
    console.log(error.message);

    res.status(400).json({ message: error.message });
  }
});

function fireNotif() {
  io.emit("practice", { message: "Notif" });
  console.log();
}

app.post("/request", authenticateToken, (req, res) => {
  const requesterId = req.user.userId;

  const addresseeId = req.body.addresseeId;
  try {
    const sendFriendReq = db
      .prepare(
        `INSERT INTO friendships (requester_id, addressee_id, status)
VALUES (?, ?, ?)`
      )
      .run(requesterId, addresseeId, "pending");

    const friendshipId = sendFriendReq.lastInsertRowid;

    const result = db
      .prepare(
        `INSERT INTO notifications (userId, actorId, type, message, friendshipId)
VALUES (?, ?, ?, ?, ?)`
      )
      .run(
        addresseeId,
        requesterId,
        "friend_request",
        `${req.user.username} sent you a friend request`,
        friendshipId
      );

    notifyUser(addresseeId, {
      id: result.lastInsertRowid,
      type: "friend_request",
      message: `${req.user.username} sent you a friend request`,
      link: "/friends/requests",
    });

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
  } catch ({ message }) {
    console.log(message);
    res.status(400).json({ message: message });
  }
});

app.get("/notifications", authenticateToken, (req, res) => {
  try {
    // const getNotifications = db
    //   .prepare("SELECT * FROM notifications WHERE userId = ? ")
    //   .all();

    const getNotifs = db.prepare(
      `SELECT
                n.id,
                n.type,
                n.message,
                n.isRead,
                n.createdAt,
                f.id AS friendshipId,
                f.status,
                f.requester_id,
                f.addressee_id
              FROM notifications n
              JOIN friendships f
                ON f.id = n.friendshipId
              WHERE n.userId = ?
              ORDER BY n.createdAt DESC;
`
    ).all(req.user.userId);

    return res.status(200).json(getNotifs);
  } catch ({ message }) {
    console.log(message);
    return res.status(400).json({ messsage: message });
  }
});

const io = new Server(server, {
  cors: { origin: "http://localhost:5173", credentials: true },
});

io.on("connection", (socket) => {
  console.log("Socket connected");

  socket.on("join", (userId) => {
    socket.join(`user:${userId}`);
    console.log(userId);
  });

  socket.on("disconnect", () => {
    console.log("Socket disconnected");
  });
});

function notifyUser(userId, notification) {
  io.to(`user:${userId}`).emit("friend_request", notification);
}





app.post(
  "/profile/photo",
  authenticateToken,
  uploadProfilePhoto.single("photo"),
  (req, res) => {
    const photoUrl = `http://localhost:3000/uploads/profile-photos/${req.file.filename}`;

http: console.log(req.file);
    

    db.prepare(
      `
      UPDATE user_profiles
      SET avatarUrl = ?
      WHERE userId = ?
    `
    ).run(photoUrl, req.user.userId);

    res.json({ photoUrl });
  }
);




server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
