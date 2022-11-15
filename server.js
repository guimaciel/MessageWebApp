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
const { getMessages } = require("./routes/messages");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());

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

app.get("/rooms", getRooms);

app.post("/register", registerUser);

app.post("/login", loginUser);

app.get("/messages", getMessages);

app.listen(port, () => console.log(`Server is runing on port ${port}`));
