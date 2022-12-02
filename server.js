const cookieSession = require("cookie-session");
const bcrypt = require("bcrypt");
const express = require("express");
const port = 8000;
const { Pool } = require("pg");
const cors = require("cors");
const { hashPassword } = require("./helpers/users");
const { registerUser } = require("./routes/register");
const { getRooms } = require("./routes/rooms");
const { loginUser } = require("./routes/login");
const { getMessages, postMessages } = require("./routes/messages");
require("dotenv").config();

// const session = require("express-session");

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
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

app.get("/messages/:id", getMessages);

// Mudar para post ------->
app.get("/messages", postMessages);

// Apenas para referencia do uso de cookie session - apagar depois de pronto ------->
app.post("/new", async (req, res) => {
  try {
    const userId = req.body.userId;
    req.session.userId = userId;
    console.log("ID:", userId);
    res.send({ message: "saves" }).status(201);
  } catch (error) {
    console.log(error);
  }
});

app.get("/name", async (req, res) => {
  try {
    console.log(req.session.userId);
    res.send({ id: req.session.userId });
  } catch (error) {
    console.log(error);
  }
});
// <------- Apenas para referencia do uso de cookie session - apagar depois de pronto

app.listen(port, () => console.log(`Server is runing on port ${port}`));
