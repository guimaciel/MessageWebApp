const { Pool } = require("pg");
require("dotenv").config();

const dbCredentials = {
  user: process.env.DB_NAME,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
};

const getMessages = (req, res) => {
  const room = req.params.id;
  req.session.room = room;
  const userId = req.session.userId
  const pool = new Pool(dbCredentials);
  pool
    .query(
      `SELECT users.name AS userName, users.id AS userId, message AS message, dt_message AS dtMessage, messages.id as idMessage, rooms.name AS roomName, rooms.id as roomId FROM messages
    JOIN rooms
    ON room = rooms.id
    JOIN users
    ON users.id = messages.user_id
    WHERE rooms.id = $1
    ;
    `,
      [room]
    )
    .then((res) => res.rows)
    .then((messages) => {
      res.status(200).json(messages);
    })
    .catch((err) => {
      console.log("err", err);
    })
    .finally(() => {
      pool.end();
    });
};

const updateLastRead = (req,res) => {
  const room = req.body.room;
  const userId = req.session.userId
  const idLastMessage = req.body.idLastMessage;
  const pool = new Pool(dbCredentials);
  pool
    .query(`
        UPDATE rooms_users SET last_msg_viewed = $1 WHERE room = $2 AND user_id = $3
      `, [idLastMessage, room, userId]
      )
      .then((res) => res.rows)
      .then((result) => {

      })
      .catch((err) => {
        console.log("error",err);
      })
      .finally(() => {
        pool.end();
      });
}

const postMessages = (req, res) => {
  console.log("-----------------------");
  const timeElapsed = Date.now();
  const today = new Date(timeElapsed);

  const message = req.body;
  const data = today.toUTCString();
  
  console.log("MSG A INSERIR", message);

  const pool = new Pool(dbCredentials);
  pool
    .query(
      `INSERT INTO messages (room, user_id, message, dt_message) VALUES ($1, $2, $3 , $4) returning *;
    `,
      [message.room.id, message.user.id, message.message, data]
    )
    .then((res) => res.rows)
    .then((messages) => {
      res.status(201).json(messages);
    })
    .catch((err) => {
      console.log("err", err);
      res.status(400).message(err);
    })
    .finally(() => {
      pool.end();
    });
};

module.exports = { getMessages, postMessages, updateLastRead };
