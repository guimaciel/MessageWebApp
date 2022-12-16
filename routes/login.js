const bcrypt = require("bcrypt");
const { Pool } = require("pg");
require("dotenv").config();

const dbCredentials = {
  user: process.env.DB_NAME,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
};

const loginUser = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  let matchPass = false;

  const pool = new Pool(dbCredentials);
  pool
    .query("SELECT * FROM users WHERE email = $1", [email])
    .then((res) => res.rows)
    .then((users) => {
      if (users.length !== 1) {
        res.status(404).send({ message: "User not found" });
      } else {
        bcrypt.compare(password, users[0].password, function(err,result) {
          if (result) {
            req.session.userId = users[0].id;
            req.session.userName = users[0].name;
            req.session.room = null;
            res.send({message: "saves"}).status(201);
          } else {

          }
        });
      }

    })
    .catch((err) => {
      if (err) {
        console.log("err", err);
        res.send({ message: "Username not found" });
      }
    })
    .finally(() => {
      pool.end();
    });
};

const checkUserExists = (req, res) => {
  const email = req.body.email;

  const pool = new Pool(dbCredentials);
  pool
    .query("SELECT * FROM users WHERE email = $1", [email])
    .then((res) => res.rows)
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
        console.log("err", err);
    })
    .finally(() => {
      pool.end();
    });
};

const logoutUser = (req, res) => {
  req.session = null;
  return res.status(200).send();
};

module.exports = { loginUser, logoutUser, checkUserExists };
