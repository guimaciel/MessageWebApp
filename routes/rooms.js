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
    .query(
      `SELECT distinct rooms.id, rooms.name FROM rooms
    JOIN rooms_users
    ON rooms.id = rooms_users.room
    `
    )
    .then((res) => res.rows)
    .then((messages) => {
      console.log("messages", messages);
      res.json(messages);
    })
    .catch((err) => {
      console.log("err", err);
    })
    .finally(() => {
      pool.end();
    });
};

const createRooms = (req, res) => {
  const name = "sadad";
  const key = "41421";

  const pool = new Pool(dbCredentials);
  pool
    .query(
      `INSERT INTO rooms (name, key) VALUES ($1, $2) returning *;
    `,
      [name, key]
    )
    .then((res) => res.rows)
    .then((rooms) => {
      console.log("messages", rooms);
      res.json(rooms);
    })
    .catch((err) => {
      console.log("err", err);
    })
    .finally(() => {
      pool.end();
    });
};

const joinRooms = (req, res) => {
  const room = req.body.room.id;
  const user_id = req.body.user.id;

  const pool = new Pool(dbCredentials);
  pool
    .query(
      `INSERT INTO rooms_users (room, user_id) VALUES ($1, $2) returning *;
    `,
      [room, user_id]
    )
    .then((res) => res.rows)
    .then((rooms) => {
      console.log("messages", rooms);
      res.json(rooms);
    })
    .catch((err) => {
      console.log("err", err);
    })
    .finally(() => {
      pool.end();
    });
};

module.exports = { getRooms, createRooms, joinRooms };
