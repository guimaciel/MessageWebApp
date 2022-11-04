const { Pool } = require("pg");
require("dotenv").config();

const dbCredentials = {
  user: process.env.DB_NAME,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
};

const getRooms = (req, res) => {
  const pool = new Pool(dbCredentials);
  pool
    .query("SELECT message FROM messages")
    .then((res) => res.rows)
    .then((messages) => {
      console.log("messages", messages);
    })
    .catch((err) => {
      console.log("err", err);
    })
    .finally(() => {
      pool.end();
    });
};

module.exports = { getRooms };
