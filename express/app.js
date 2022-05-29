const { response } = require("express");
const express = require("express");
const cors = require('cors');
require("dotenv").config();
const { connection } = require("./db_connect");

const app = express();
const port = process.env.PORT || 5000;

app.use(
  cors({
    origin: "*",
    methods: "GET,PATCH,POST,PUT,DELETE,OPTIONS",
    credentials: true,
    allowedHeaders:
      "Content-Type, Authorization, X-Requested-With, Accept, xsrf-token",
  })
);

app.use(express.json());

// running server test
app.listen(port, (err) => {
  if (err) {
    console.log("Error");
  } else {
    console.log(`Server is running on port: ${port}`);
  }
});

// default test route
app.get("/", (req, res) => {
  res
    .status(200)
    .json({ message: "Hello Welcome to our API!" });
});

//get all users
app.get("/api/users/", async (req, res) => {
  try {
    const [result] = await connection.promise().query("SELECT * FROM users");
    res.json(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

//Find
app.get("/api/users/:id", async (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM users WHERE id=?";
  try {
    const [result] = await connection.promise().query(sql, [id]);
    if (!result.length) {
      res.status(404).send("User does not exist!");
    }
    res.status(200).json(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// create User
app.post("/api/users/", async (req, res) => {
  const { firstname, lastname, email, user_password } = req.body;
  const sql = "INSERT INTO users SET ?";
  const user = { firstname, lastname, email, user_password };
  try {
    const [results] = await connection.promise().query(sql, [user]);
    const id = results.insertId;
    const [newUser] = await connection
      .promise()
      .query(`SELECT * FROM users WHERE id=${id}`);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// UPDATE
app.patch("/api/users/:id", async (req, res) => {
  const { id } = req.params;
  const { firstname, lastname, email, user_password } = req.body;

  if (!firstname && !lastname && !email && !user_password) {
    res.status(400).send("You need to give all mandatory datas!");
  } else {
    const user = {};
    if (firstname) {
      user.firstname = firstname;
    }
    if (lastname) {
      user.lastname = lastname;
    }
    if (email) {
      user.email = email;
    }
    if (user_password) {
      user.user_password = user_password;
    }
    const sql = "UPDATE users SET ? WHERE id=?";
    try{
        await connection.promise().query(sql, [user, id]);
        res.sendStatus(204);
    }catch(err){
        res.status(500).send(err.message);
    }
  }
});

//delete
app.delete("/api/users/:id", async (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM users WHERE id=?";
  try {
    await connection.promise().query(sql, [id]);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).send(err.message);
  }
});
