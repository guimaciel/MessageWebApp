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
  const userId = req.session.userId;
  console.log("User Id", userId);
  pool
    .query(
      `SELECT distinct rooms.id, rooms.name,  (SELECT COUNT(*) FROM messages WHERE room = rooms.id AND id > rooms_users.last_msg_viewed) as nummessages FROM rooms
    JOIN rooms_users
    ON rooms.id = rooms_users.room
    WHERE rooms_users.user_id = $1
    `, [userId]
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

const checkRoomExists = (req, res) => {
  const name = req.body.name;

  const pool = new Pool(dbCredentials);
  pool.query('SELECT * FROM rooms WHERE name = $1', [name])
      .then((resp) => {
        res.json(resp.rows)
      }).catch((err) => {
        console.log("err",err);
      }).finally(() => {
        pool.end();
      })
}

const createRooms = (req, res) => {
  const name = req.body.name;
  const key = "41421";
  
  const pool = new Pool(dbCredentials);
  pool.query(`INSERT INTO rooms (name, key) VALUES ($1, $2) returning *;`,[name, key])
      .then((res) => res.rows)
      .then((rooms) => {
            console.log("rooms", rooms);
            res.json(rooms);
          })
      .catch((err) => {
        console.log("err",err);
      }).finally(() => {
        pool.end();
      })
};

const listRoomsNotInto = (req, res) => {
  const userId = req.session.userId;
  const pool = new Pool(dbCredentials);
  pool.query(`select id, name, key from rooms where not exists (select 1 from rooms_users where rooms.id = rooms_users.room AND rooms_users.user_id = $1)`,[userId])
      .then((resp) => {
        console.log("rooms--",resp.rows);
        res.json(resp.rows);
      })
      .catch((err) => {
        console.log("err",err);
      }).finally(() => {
        pool.end();
      })
}

const joinRooms = (req, res) => {
  const room = req.body.idRoom;
  const user_id = req.session.userId;
  console.log("Room", req.body, "ID", user_id);
    const pool = new Pool(dbCredentials);
  pool
    .query(
      `INSERT INTO rooms_users (room, user_id, last_msg_viewed ) VALUES ($1, $2, 0) returning *;
    `,
      [room, user_id]
    )
    .then((res) => res.rows)
    .then((rooms) => {
      console.log("rooms users insert", rooms);
      res.json(rooms);
    })
    .catch((err) => {
      console.log("err", err);
    })
    .finally(() => {
      pool.end();
    });
};

const roomsUsers = (req, res) => {
  const room = req.params.room;
  const pool = new Pool(dbCredentials);
  pool
    .query(
      `SELECT users.name, users.id
      FROM rooms_users 
      JOIN users
      ON user_id = users.id
      WHERE room = $1;
    `,
      [room]
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

module.exports = { getRooms, createRooms, joinRooms, checkRoomExists, listRoomsNotInto, roomsUsers };
