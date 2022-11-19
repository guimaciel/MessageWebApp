const bcrypt = require("bcrypt");
const { Pool } = require("pg");
const { hashPassword } = require("../helpers/users");
require("dotenv").config();

const dbCredentials = {
  user: process.env.DB_NAME,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
};

const registerUser = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;
  const hashedPassword = await hashPassword(password, 12);

  const pool = new Pool(dbCredentials);
  pool
    .query(
      "INSERT INTO users (email, password, name) VALUES ($1,$2,$3) returning *",
      [email, hashedPassword, name]
    )
    .then((res) => res.rows)
    .then((users) => {
      console.log("users", users);
    })
    .catch((err) => {
      console.log("err", err);
    })
    .finally(() => {
      pool.end();
    });
};

module.exports = { registerUser };
