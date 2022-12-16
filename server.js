const cookieSession = require("cookie-session");
const bcrypt = require("bcrypt");
const express = require("express");
const port = 8000;
const { Pool } = require("pg");
const cors = require("cors");
const { hashPassword } = require("./helpers/users");
const { registerUser } = require("./routes/register");
const { getRooms, createRooms, checkRoomExists, listRoomsNotInto, joinRooms, roomsUsers } = require("./routes/rooms");
const { loginUser, checkUserExists, logoutUser } = require("./routes/login");
const { getMessages, postMessages, updateLastRead } = require("./routes/messages");
require("dotenv").config();

// const session = require("express-session");

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: process.env.urlclient,
    credentials: true,
  })
);

const dbCredentials = {
  user: process.env.DB_NAME,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
};

// SOCKET --->
const http = require('http');
const {Server} = require('socket.io');
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.urlclient,
    method: ["GET","POST"],
  }
});

io.on("connection", (socket) => {

  socket.on("send_message", (data) => {
    socket.broadcast.emit("receive_message",data);
  })

})
// SOCKET <---

app.use(
  cookieSession({
    name: "session",
    keys: [
      /* secret keys */
      process.env.key1,
      process.env.key1,
    ],

    // Cookie Options
    maxAge: 24 * 60 * 60 * 1000,
  })
);

// app.use(
//   session({
//     resave: false,
//     saveUnitialized: false,
//     secret: "session",
//     cookie: {
//       maxAge: 1000*60*60,
//       sameSite: "lax",
//       secure: false,
//     },
//   })
// );

app.get("/rooms", getRooms);

app.post("/register", registerUser);

app.post("/login", loginUser);
app.get("/logout", logoutUser);
app.post("/checkUserExists", checkUserExists);

app.get("/messages/:id", getMessages);

app.post("/messages", postMessages);

app.post("/updateLastViewed", updateLastRead);

app.post("/checkRoomExists", checkRoomExists)
app.post("/createRoom", createRooms);
app.get("/listRoomsNotInto", listRoomsNotInto);
app.post("/joinRooms", joinRooms);
app.get("/roomUsers/:room", roomsUsers);

// Apenas para referencia do uso de cookie session - apagar depois de pronto ------->
app.post("/session", async (req, res) => {
  try {
    const userId = req.body.userId;
    req.session.userId = userId;
    res.send({ message: "saves" }).status(201);
  } catch (error) {
    console.log(error);
  }
});

app.get("/sessionRoom", async (req, res) => {
  try {
    res.send({ room: req.session.room  });
  } catch (error) {
    console.log(error);
  }
});

app.get("/session", async (req, res) => {
  try {
    res.send({ id: req.session.userId,
                name: req.session.userName });
  } catch (error) {
    console.log(error);
  }
});
// <------- Apenas para referencia do uso de cookie session - apagar depois de pronto

// app.listen(port, () => console.log(`Server is runing on port ${port}`));
server.listen(port, () => console.log(`Server is running on port ${port}`));
